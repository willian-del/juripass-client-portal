import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useCallback } from 'react';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const leadSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().min(1, 'Telefone é obrigatório').max(30),
  company: z.string().trim().min(1, 'Empresa é obrigatória').max(100),
  employee_count: z.string().min(1, 'Selecione uma opção'),
  department: z.string().min(1, 'Selecione uma opção'),
  seniority: z.string().min(1, 'Selecione uma opção'),
  interest: z.string().min(1, 'Selecione uma opção'),
  evaluating_psychosocial: z.string().min(1, 'Selecione uma opção'),
  has_legal_benefit: z.string().min(1, 'Selecione uma opção'),
  message: z.string().trim().max(1000).optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

const SENIORITY_LABELS: Record<string, string> = {
  analista: 'Analista',
  coordenador: 'Coordenador',
  gerente: 'Gerente',
  diretor: 'Diretor',
  socio: 'Sócio / Fundador',
};

interface LeadFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const STEP_FIELDS: Record<number, (keyof LeadFormData)[]> = {
  1: ['name', 'email', 'phone', 'company'],
  2: ['employee_count', 'department', 'seniority', 'interest', 'evaluating_psychosocial', 'has_legal_benefit'],
  3: ['message'],
};

export function LeadFormDialog({ open, onOpenChange }: LeadFormDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '', email: '', phone: '', company: '',
      employee_count: '', department: '', seniority: '',
      interest: '', evaluating_psychosocial: '', has_legal_benefit: '',
      message: '',
    },
  });

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('phone', formatPhone(e.target.value), { shouldValidate: true });
  }, [setValue]);

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleClose = (open: boolean) => {
    if (!open) {
      setStep(1);
      reset();
    }
    onOpenChange(open);
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-lead-email', {
        body: {
          ...data,
          role_title: SENIORITY_LABELS[data.seniority] || data.seniority,
        },
      });
      if (error) throw error;
      toast({ title: 'Mensagem enviada!', description: 'Entraremos em contato em breve.' });
      reset();
      setStep(1);
      onOpenChange(false);
    } catch (err) {
      console.error('Lead submission error:', err);
      toast({ title: 'Erro ao enviar', description: 'Tente novamente em alguns instantes.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Agende uma conversa</DialogTitle>
          <DialogDescription>
            Preencha seus dados e nossa equipe entrará em contato.
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 pt-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Etapa {step} de 3 — {step === 1 ? 'Dados de contato' : step === 2 ? 'Qualificação' : 'Mensagem'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          {/* Step 1 - Contact */}
          {step === 1 && (
            <>
              <Field label="Nome *" error={errors.name?.message}>
                <Input placeholder="Seu nome" {...register('name')} />
              </Field>
              <Field label="Email *" error={errors.email?.message}>
                <Input type="email" placeholder="seu@email.com" {...register('email')} />
              </Field>
              <Field label="Telefone *" error={errors.phone?.message}>
                <Input placeholder="(11) 99999-9999" {...register('phone')} onChange={handlePhoneChange} />
              </Field>
              <Field label="Empresa *" error={errors.company?.message}>
                <Input placeholder="Nome da empresa" {...register('company')} />
              </Field>
            </>
          )}

          {/* Step 2 - Qualification */}
          {step === 2 && (
            <div className="space-y-5">
              <RadioField
                label="Número de colaboradores *"
                value={watch('employee_count')}
                onChange={(v) => setValue('employee_count', v, { shouldValidate: true })}
                error={errors.employee_count?.message}
                options={[
                  { value: 'up_to_50', label: 'Até 50' },
                  { value: '50_200', label: '50 – 200' },
                  { value: '200_500', label: '200 – 500' },
                  { value: '500_1000', label: '500 – 1.000' },
                  { value: '1000_plus', label: '1.000+' },
                ]}
              />
              <RadioField
                label="Qual sua área? *"
                value={watch('department')}
                onChange={(v) => setValue('department', v, { shouldValidate: true })}
                error={errors.department?.message}
                options={[
                  { value: 'rh', label: 'RH / Pessoas' },
                  { value: 'juridico', label: 'Jurídico' },
                  { value: 'financeiro', label: 'Financeiro' },
                  { value: 'compliance', label: 'Compliance' },
                  { value: 'diretoria', label: 'Diretoria' },
                  { value: 'outro', label: 'Outro' },
                ]}
              />
              <RadioField
                label="Cargo *"
                value={watch('seniority')}
                onChange={(v) => setValue('seniority', v, { shouldValidate: true })}
                error={errors.seniority?.message}
                options={[
                  { value: 'analista', label: 'Analista' },
                  { value: 'coordenador', label: 'Coordenador' },
                  { value: 'gerente', label: 'Gerente' },
                  { value: 'diretor', label: 'Diretor' },
                  { value: 'socio', label: 'Sócio / Fundador' },
                ]}
              />
              <RadioField
                label="Como podemos ajudar? *"
                value={watch('interest')}
                onChange={(v) => setValue('interest', v, { shouldValidate: true })}
                error={errors.interest?.message}
                options={[
                  { value: 'apoio_juridico', label: 'Apoio jurídico para colaboradores' },
                  { value: 'nr01', label: 'Adequação à NR-01 (riscos psicossociais)' },
                  { value: 'beneficio', label: 'Benefício corporativo' },
                  { value: 'passivo_trabalhista', label: 'Redução de passivo trabalhista' },
                  { value: 'conhecer', label: 'Quero conhecer a solução' },
                ]}
              />
              <RadioField
                label="Sua empresa já está avaliando riscos psicossociais? *"
                value={watch('evaluating_psychosocial')}
                onChange={(v) => setValue('evaluating_psychosocial', v, { shouldValidate: true })}
                error={errors.evaluating_psychosocial?.message}
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'ainda_nao', label: 'Ainda não' },
                  { value: 'pesquisando', label: 'Estou pesquisando o tema' },
                ]}
              />
              <RadioField
                label="Sua empresa oferece algum benefício de apoio jurídico hoje? *"
                value={watch('has_legal_benefit')}
                onChange={(v) => setValue('has_legal_benefit', v, { shouldValidate: true })}
                error={errors.has_legal_benefit?.message}
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'nao', label: 'Não' },
                  { value: 'nao_sei', label: 'Não sei' },
                ]}
              />
            </div>
          )}

          {/* Step 3 - Message */}
          {step === 3 && (
            <Field label="Mensagem (opcional)" error={errors.message?.message}>
              <Textarea
                placeholder="Alguma dúvida ou contexto adicional?"
                rows={4}
                {...register('message')}
              />
            </Field>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-1">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={goBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={goNext} className="flex-1">
                Próximo <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Send className="h-4 w-4 mr-1" />}
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            15 minutos para entender se faz sentido para sua empresa.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ── Helper components ── */

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function RadioField({
  label, value, onChange, error, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid gap-1.5">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2.5 rounded-md border border-input px-3 py-2 text-sm cursor-pointer hover:bg-accent transition-colors has-[data-state=checked]:border-primary has-[data-state=checked]:bg-accent"
          >
            <RadioGroupItem value={opt.value} />
            {opt.label}
          </label>
        ))}
      </RadioGroup>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
