export type TipoUsuario = 'principal' | 'dependente';
export type AppRole = 'super_admin' | 'admin_empresa' | 'usuario';
export type StatusAtendimento = 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';

export interface Empresa {
  id: string;
  codigo_empresa: string;
  nome: string;
  cnpj: string;
  created_at: string;
  deleted_at: string | null;
}

export interface Usuario {
  id: string;
  id_auth: string;
  numero_cliente: string;
  cpf_criptografado: string;
  nome: string;
  email: string;
  telefone: string | null;
  tipo_usuario: TipoUsuario;
  id_usuario_principal: string | null;
  id_empresa: string;
  grau_parentesco: string | null;
  created_at: string;
  deleted_at: string | null;
  empresas?: Empresa;
  usuario_principal?: Usuario;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  id_empresa: string | null;
}

export interface Atendimento {
  id: string;
  id_usuario: string;
  id_empresa: string;
  descricao: string | null;
  data: string;
  status: StatusAtendimento;
  origem: string;
  created_at: string;
  deleted_at: string | null;
  usuarios?: Usuario;
  empresas?: Empresa;
}
