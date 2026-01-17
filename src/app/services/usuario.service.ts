import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, UsuarioCadastro } from '../interfaces/usuario';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5074/api/usuario';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: UsuarioCadastro) {
    return this.http.post<UsuarioCadastro>(`${this.apiUrl}/cadastrar`, usuario).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  login(usuario: LoginRequest) {

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, usuario).pipe(
      tap(response => {
        // Salva o token
        if (usuario.lembrarMe) {
          // localStorage = permanente (sobrevive ao fechar o navegador)
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(response.usuario.id));
          localStorage.setItem('lembrarMe', 'true');
        } else {
          // sessionStorage = temporário (apaga ao fechar o navegador)
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('usuario', JSON.stringify(response.usuario.id));
        }
      }), 
      catchError(error => {
        console.error('Erro no login capturado no service:', error);
        return throwError(() => error); // Repassa o erro para o componente
  })
    );
  }

  
}
