import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { LoginRequest, LoginResponse, CadastroResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  /**
   * Cadastra um novo usuário
   */
  cadastrar(usuario: Usuario): Observable<CadastroResponse> {
    return this.http.post<CadastroResponse>(`${this.apiUrl}/cadastro`, usuario);
  }

  /**
   * Realiza o login do usuário
   */
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, loginRequest);
  }
}
