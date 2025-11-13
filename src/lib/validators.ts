import { z } from "zod";
import { validateCPF } from "./cpfUtils";

export const cadastroSchema = z.object({
  cpf: z.string()
    .min(11, "CPF deve conter 11 dígitos")
    .max(14, "CPF inválido")
    .refine((cpf) => validateCPF(cpf), {
      message: "CPF inválido",
    }),
  nome: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
  telefone: z.string()
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val === '' || /^\d{10,11}$/.test(val), {
      message: "Telefone inválido"
    })
    .optional(),
  codigo_empresa: z.string()
    .min(1, "Código da empresa é obrigatório"),
  senha: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
  confirmar_senha: z.string()
}).refine((data) => data.senha === data.confirmar_senha, {
  message: "As senhas não conferem",
  path: ["confirmar_senha"],
});

export const dependenteSchema = z.object({
  cpf: z.string()
    .min(11, "CPF deve conter 11 dígitos")
    .max(14, "CPF inválido")
    .refine((cpf) => validateCPF(cpf), {
      message: "CPF inválido",
    }),
});

export const finalizarDependenteSchema = z.object({
  nome: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
  telefone: z.string()
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val === '' || /^\d{10,11}$/.test(val), {
      message: "Telefone inválido"
    })
    .optional(),
  grau_parentesco: z.enum(["conjuge", "filho", "pai_mae", "irmao", "outro"], {
    errorMap: () => ({ message: "Selecione o grau de parentesco" }),
  }),
  senha: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
  confirmar_senha: z.string()
}).refine((data) => data.senha === data.confirmar_senha, {
  message: "As senhas não conferem",
  path: ["confirmar_senha"],
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export const empresaSchema = z.object({
  nome: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  cnpj: z.string()
    .regex(/^\d{14}$/, "CNPJ deve conter 14 dígitos"),
  codigo_empresa: z.string()
    .min(4, "Código deve ter pelo menos 4 caracteres")
    .max(20, "Código muito longo")
    .regex(/^[A-Z0-9]+$/, "Código deve conter apenas letras maiúsculas e números"),
});

export const perfilSchema = z.object({
  nome: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
  telefone: z.string()
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val === '' || /^\d{10,11}$/.test(val), {
      message: "Telefone inválido"
    })
    .optional(),
});
