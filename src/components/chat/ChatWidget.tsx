import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from './ChatMessage';
import { useChat } from './useChat';
import { useLeadForm } from '@/contexts/LeadFormContext';
import { cn } from '@/lib/utils';

const WELCOME_MESSAGE = {
  role: 'assistant' as const,
  content:
    'Olá! 👋 Sou a assistente da Juripass.\n\nAjudamos empresas a estruturar o acolhimento de questões pessoais dos colaboradores e apoiar o RH na gestão de riscos psicossociais.\n\nVocê trabalha com RH ou gestão de pessoas?',
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, error, send, reset, setOnAction } = useChat('qualify');
  const { open: openLeadForm } = useLeadForm();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allMessages = [WELCOME_MESSAGE, ...messages];

  // Skip rendering during react-snap pre-rendering
  const isPrerendering = typeof navigator !== 'undefined' && navigator.userAgent?.includes('ReactSnap');

  // Handle actions from AI agent
  useEffect(() => {
    setOnAction((action) => {
      if (action.type === 'open_lead_form') {
        openLeadForm();
      }
      // send_material is now handled inline via the assistant's message with a clickable link
    });
  }, [setOnAction, openLeadForm]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (isPrerendering) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    send(trimmed);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl',
          open && 'scale-0 opacity-0'
        )}
        aria-label="Abrir chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          'fixed bottom-5 right-5 z-50 flex w-[380px] max-w-[calc(100vw-2.5rem)] flex-col rounded-2xl border bg-background shadow-2xl transition-all duration-300',
          open ? 'h-[520px] opacity-100 scale-100' : 'h-0 opacity-0 scale-95 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold">Juripass AI</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={reset} title="Reiniciar conversa">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {allMessages.map((msg, i) => (
            <ChatMessage key={i} message={msg} onAction={(actionType) => {
              if (actionType === 'agendar') openLeadForm();
            }} />
          ))}
          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center text-xs text-destructive py-1">{error}</div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t px-3 py-3 flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 text-sm"
            maxLength={500}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
