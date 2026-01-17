import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, UsuarioCadastro } from '../interfaces/usuario';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: UsuarioCadastro): Observable<UsuarioCadastro> {
    return this.http.post<UsuarioCadastro>(this.apiUrl, usuario).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  login(usuario: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, usuario).pipe(
      tap(response => {
        if (usuario.lembrarMe) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(response.usuario.id));
          localStorage.setItem('lembrarMe', 'true');
        } else {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('usuario', JSON.stringify(response.usuario.id));
        }
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /*
  isLogado(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    // Verifica primeiro no localStorage, depois no sessionStorage
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  */
}
