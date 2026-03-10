import ReactMarkdown from 'react-markdown';
import { Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { ChatMessage as ChatMessageType } from './useChat';

interface ChatMessageProps {
  message: ChatMessageType;
  onAction?: (type: 'agendar' | 'material') => void;
}

export function ChatMessage({ message, onAction }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground rounded-bl-md'
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ol]:mb-2">
            <ReactMarkdown>{message.content}</ReactMarkdown>
            {/* Render inline CTA button if message mentions scheduling */}
            {onAction && message.content && /formulário|agendar uma conversa|abrir.*(formulário|agendamento)/i.test(message.content) && (
              <Button
                size="sm"
                variant="default"
                className="mt-2 gap-1.5 text-xs"
                onClick={() => onAction('agendar')}
              >
                <Calendar className="h-3.5 w-3.5" />
                Agendar conversa
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
