import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LoginRequest } from '../../interfaces/usuario';
import { NotificationService } from '../../services/notification.service';

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
    private notificationService: NotificationService,
    private router: Router
  ) { }


  mostrandoSenha: boolean = false;

  mostrarSenha(): void {
    this.mostrandoSenha = !this.mostrandoSenha;
  }

  login() {

    if (!this.usuario.email || !this.usuario.senha) {
      this.notificationService.warning('Preencha todos os campos!');
      return;
    }

    this.usuarioService.login(this.usuario).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        this.notificationService.success(`Bem-vindo, ${response.usuario.nome || 'usuário'}!`);

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500); // Aguarda 500ms antes de navegar
      },

      error: (error) => {
        this.notificationService.handleHttpError(error);
      }
    });

    
  }
}
