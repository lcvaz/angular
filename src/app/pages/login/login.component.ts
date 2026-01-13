import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { LoginRequest } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  lembrarMe: boolean = false;
  isLoading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  login(): void {
    if (!this.email || !this.senha) {
      this.notificationService.warning('Por favor, preencha todos os campos!');
      return;
    }

    this.isLoading = true;

    const loginRequest: LoginRequest = {
      email: this.email,
      senha: this.senha,
      lembrarMe: this.lembrarMe
    };

    this.usuarioService.login(loginRequest).subscribe({
      next: (response) => {
        // Salva o token com base na opção "Lembrar-me"
        this.authService.saveToken(
          response.token,
          this.lembrarMe,
          response.refreshToken
        );

        // Mostra notificação de sucesso
        const mensagem = response.message ||
          `Bem-vindo(a), ${response.usuario.nome}!`;
        this.notificationService.success(mensagem);

        // Redireciona para a página inicial ou dashboard
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);

        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao fazer login:', erro);

        // Trata diferentes tipos de erro
        let mensagemErro = 'Erro ao fazer login. Tente novamente.';

        if (erro.status === 401) {
          mensagemErro = 'Email ou senha incorretos!';
        } else if (erro.status === 404) {
          mensagemErro = 'Usuário não encontrado!';
        } else if (erro.status === 0) {
          mensagemErro = 'Não foi possível conectar ao servidor!';
        } else if (erro.error?.message) {
          mensagemErro = erro.error.message;
        }

        this.notificationService.error(mensagemErro);
        this.isLoading = false;
      }
    });
  }
}
