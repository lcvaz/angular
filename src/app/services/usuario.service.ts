import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, Usuario } from '../interfaces/usuario';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<LoginResponse> {
    return this.http.post(this.apiUrl, usuario);
  }

  login(usuario: Usuario): Observable<LoginResponse> {
    const loginData: LoginRequest = {
      email: usuario.email,
      senha: usuario.senha,
      lembrarMe: false  // Default value, can be changed based on UI logic
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        // Salva o token
        if (lembrarMe) {
          // localStorage = permanente (sobrevive ao fechar o navegador)
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          localStorage.setItem('lembrarMe', 'true');
        } else {
          // sessionStorage = temporário (apaga ao fechar o navegador)
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('usuario', JSON.stringify(response.usuario));
        }
      })
    );
  }

  isLogado(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    // Verifica primeiro no localStorage, depois no sessionStorage
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
}
