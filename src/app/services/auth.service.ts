import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  /**
   * Salva o token com base na opção "Lembrar-me"
   * @param token Token de autenticação
   * @param lembrarMe Se true, salva no localStorage; se false, salva no sessionStorage
   * @param refreshToken Token de refresh (opcional)
   */
  saveToken(token: string, lembrarMe: boolean, refreshToken?: string): void {
    const storage = lembrarMe ? localStorage : sessionStorage;

    storage.setItem('auth_token', token);

    if (refreshToken) {
      storage.setItem('refresh_token', refreshToken);
    }

    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Obtém o token armazenado (verifica localStorage e sessionStorage)
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }

  /**
   * Obtém o refresh token armazenado
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
  }

  /**
   * Verifica se existe um token válido
   */
  hasValidToken(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Remove todos os tokens e faz logout
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('refresh_token');

    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Verifica se o usuário optou por "Lembrar-me" (token no localStorage)
   */
  isRememberMe(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }
}
