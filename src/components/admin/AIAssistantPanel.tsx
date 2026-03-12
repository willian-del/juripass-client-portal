import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { useChat } from '@/components/chat/useChat';
import { supabase } from '@/integrations/supabase/client';
import { Send, Sparkles, FileText, MessageSquare, Target, RotateCcw } from 'lucide-react';

interface AIAssistantPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead?: any;
}

const QUICK_ACTIONS = [
  { label: 'Gerar proposta comercial', icon: FileText, prompt: 'Gere uma proposta comercial personalizada para este lead, considerando o perfil da empresa, cargo e interesse demonstrado.' },
  { label: 'Sugerir follow-up', icon: MessageSquare, prompt: 'Sugira uma mensagem de follow-up adequada para este lead, considerando o estágio atual no funil e o tempo desde o último contato.' },
  { label: 'Como abordar este lead?', icon: Target, prompt: 'Analise o perfil deste lead e sugira a melhor estratégia de abordagem, incluindo argumentos-chave e possíveis objeções.' },
];

export function AIAssistantPanel({ open, onOpenChange, lead }: AIAssistantPanelProps) {
  const [input, setInput] = useState('');
  const { messages, isLoading, error, send, reset } = useChat('assist');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthToken(data.session?.access_token || '');
    });
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const buildLeadContext = () => {
    if (!lead) return undefined;
    return {
      nome: lead.name,
      empresa: lead.company,
      cargo: lead.role_title,
      email: lead.email,
      telefone: lead.phone,
      colaboradores: lead.employee_count,
      area: lead.department,
      interesse: lead.interest,
      score: lead.lead_score,
      prioridade: lead.lead_priority,
      etapa_funil: lead.funnel_stage,
      riscos_psicossociais: lead.evaluating_psychosocial,
      beneficio_juridico: lead.has_legal_benefit,
      notas: lead.notes,
      contatado_em: lead.contacted_at,
      criado_em: lead.created_at,
      mensagem: lead.message,
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    send(text, { leadContext: buildLeadContext(), authToken });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-4 py-3 border-b pr-12">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-5 w-5 text-primary" />
              Assistente AI
            </SheetTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {lead && (
            <p className="text-xs text-muted-foreground mt-1">
              Contexto: <span className="font-medium">{lead.name}</span> — {lead.company}
            </p>
          )}
        </SheetHeader>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.length === 0 && (
            <div className="space-y-3 py-4">
              <p className="text-sm text-muted-foreground text-center">
                {lead
                  ? 'Use as ações rápidas ou digite uma pergunta sobre este lead.'
                  : 'Selecione um lead para obter sugestões contextuais, ou faça uma pergunta geral.'}
              </p>
              {lead && (
                <div className="grid gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto py-2.5"
                      onClick={() => handleSend(action.prompt)}
                      disabled={isLoading}
                    >
                      <action.icon className="h-4 w-4 mr-2 shrink-0" />
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
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
          {error && <div className="text-center text-xs text-destructive py-1">{error}</div>}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t px-3 py-3 flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo..."
            className="flex-1 text-sm min-h-[40px] max-h-[120px] resize-none"
            maxLength={500}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button type="submit" size="icon" className="h-10 w-10 shrink-0" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
