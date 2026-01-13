export interface UsuarioCadastro {
    id?: number,
    nome?: string,
    email: string,
    senha: string,
    dataCadastro?: Date;
}

export interface LoginRequest {
    email: string;
    senha: string;
    lembrarMe: boolean;  // ← Novo campo
}

export interface LoginResponse {
    token: string;
    usuario: UsuarioCadastro;
    expiresIn?: number;  // Tempo de expiração em segundos
}
