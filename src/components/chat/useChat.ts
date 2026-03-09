import { useState, useCallback, useRef } from 'react';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-commercial`;

function getSessionId() {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return 'ssr';
  let id = sessionStorage.getItem('juripass_chat_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('juripass_chat_session', id);
  }
  return id;
}

async function streamChat({
  messages,
  mode,
  leadContext,
  sessionId,
  authToken,
  onDelta,
  onDone,
  onError,
  signal,
}: {
  messages: ChatMessage[];
  mode: 'qualify' | 'assist';
  leadContext?: any;
  sessionId: string;
  authToken?: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
  signal?: AbortSignal;
}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
  };

  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ messages, mode, leadContext, sessionId }),
    signal,
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: 'Erro de conexão' }));
    onError(err.error || `Erro ${resp.status}`);
    return;
  }

  if (!resp.body) {
    onError('Sem resposta do servidor');
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          // Skip tool_result events
          if (parsed.tool_result) continue;
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          // partial JSON, put back
          buffer = line + '\n' + buffer;
          break;
        }
      }
    }

    // Flush remaining
    if (buffer.trim()) {
      for (let raw of buffer.split('\n')) {
        if (!raw) continue;
        if (raw.endsWith('\r')) raw = raw.slice(0, -1);
        if (!raw.startsWith('data: ')) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.tool_result) continue;
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }
  } finally {
    onDone();
  }
}

export function useChat(mode: 'qualify' | 'assist' = 'qualify') {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (input: string, opts?: { leadContext?: any; authToken?: string }) => {
      const userMsg: ChatMessage = { role: 'user', content: input.slice(0, 500) };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      let assistantSoFar = '';
      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: 'assistant', content: assistantSoFar }];
        });
      };

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        await streamChat({
          messages: [...messages, userMsg],
          mode,
          leadContext: opts?.leadContext,
          sessionId: getSessionId(),
          authToken: opts?.authToken,
          onDelta: upsertAssistant,
          onDone: () => setIsLoading(false),
          onError: (msg) => {
            setError(msg);
            setIsLoading(false);
          },
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          setError('Erro de conexão. Tente novamente.');
          setIsLoading(false);
        }
      }
    },
    [messages, mode]
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsLoading(false);
    setError(null);
  }, []);

  return { messages, isLoading, error, send, reset };
}
