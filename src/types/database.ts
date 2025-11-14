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
  ativo: boolean;
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

export interface InvitationLink {
  id: string;
  id_empresa: string;
  token: string;
  max_uses: number | null;
  current_uses: number;
  expires_at: string | null;
  created_by: string;
  created_at: string;
  active: boolean;
  empresas?: Empresa;
}

export interface UserImport {
  id: string;
  id_empresa: string;
  uploaded_by: string;
  filename: string;
  total_rows: number;
  successful_rows: number;
  failed_rows: number;
  status: 'processing' | 'completed' | 'failed';
  error_log: any[];
  created_at: string;
  empresas?: Empresa;
}

export interface AdminStats {
  total_usuarios: number;
  usuarios_ativos: number;
  novos_usuarios_7d: number;
  total_empresas: number;
  atendimentos_pendentes: number;
  taxa_conclusao: number;
}
