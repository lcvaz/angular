import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LoginRequest } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  usuario: LoginRequest = {
    email: '',
    senha: '',
    lembrarMe: false
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }


  mostrandoSenha: boolean = false;

  mostrarSenha(): void {
    this.mostrandoSenha = !this.mostrandoSenha;
  }

  login() {
    this.usuarioService.login(this.usuario).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard após o login
      },
      error: (error) => {
        this.tratarErroLogin(error);
      }
    });
  }

  errorMessage: string = ''; // Variável para mostrar no HTML

  private tratarErroLogin(error: any) {
  // O 'status' é o código HTTP retornado pelo backend
    switch(error.status) {
      case 401:
        this.errorMessage = 'Usuário ou senha incorretos.';
        break;
      case 403:
        this.errorMessage = 'Sua conta está bloqueada ou sem permissão.';
        break;
      case 404:
        this.errorMessage = 'Servidor de login não encontrado.';
        break;
      case 500:
        this.errorMessage = 'Erro interno no servidor. Tente novamente mais tarde.';
        break;
      case 0:
        this.errorMessage = 'Sem conexão com a internet ou API fora do ar.';
        break;
      default:
        // Tenta pegar a mensagem que veio do backend, se existir
        this.errorMessage = error.messagem || 'Ocorreu um erro desconhecido.';
    }
  }
}
