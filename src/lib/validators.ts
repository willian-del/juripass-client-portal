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

// Schema simplificado para dependentes - SEM SENHA
// O dependente criará sua própria senha no primeiro acesso
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
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
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

export const adminUsuarioSchema = z.object({
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
  id_empresa: z.string()
    .uuid("Empresa inválida"),
  tipo_usuario: z.enum(["principal", "dependente"], {
    errorMap: () => ({ message: "Selecione o tipo de usuário" }),
  }),
  grau_parentesco: z.string().optional(),
  id_usuario_principal: z.string().uuid().optional(),
  ativo: z.boolean().default(true),
  senha: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
}).refine((data) => {
  if (data.tipo_usuario === 'dependente') {
    return !!data.grau_parentesco && !!data.id_usuario_principal;
  }
  return true;
}, {
  message: "Dependentes precisam de grau de parentesco e usuário principal",
  path: ["grau_parentesco"],
});

export const adminUsuarioEditSchema = z.object({
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
  ativo: z.boolean(),
});

export const empresaSchema = z.object({
  nome: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  cnpj: z.string()
    .min(14, "CNPJ deve conter 14 dígitos")
    .max(18, "CNPJ inválido")
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 14, {
      message: "CNPJ deve conter 14 dígitos"
    }),
  codigo_empresa: z.string()
    .min(3, "Código deve ter pelo menos 3 caracteres")
    .max(20, "Código muito longo")
    .regex(/^[A-Z0-9_-]+$/, "Código deve conter apenas letras maiúsculas, números, _ ou -"),
});

export const invitationLinkSchema = z.object({
  id_empresa: z.string().uuid("Empresa inválida"),
  max_uses: z.number().int().positive().optional().nullable(),
  expires_at: z.date().optional().nullable(),
});
