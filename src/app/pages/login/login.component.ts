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
        console.error('Erro no login:', error);
        alert('Falha no login. Verifique suas credenciais e tente novamente.');
      }
    });
  }

}
