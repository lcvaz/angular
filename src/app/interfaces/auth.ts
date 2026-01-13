export interface LoginRequest {
  email: string;
  senha: string;
  lembrarMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
  message?: string;
}

export interface CadastroResponse {
  id: number;
  nome: string;
  email: string;
  dataCadastro: Date;
  message?: string;
}
