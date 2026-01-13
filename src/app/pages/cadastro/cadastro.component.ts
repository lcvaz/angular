import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  novoUsuario: Usuario = {
    nome: '',
    email: '',
    senha: ''
  };
  isLoading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  cadastrar(): void {
    if (!this.novoUsuario.nome || !this.novoUsuario.email || !this.novoUsuario.senha) {
      this.notificationService.warning('Por favor, preencha todos os campos!');
      return;
    }

    if (this.novoUsuario.senha.length < 6) {
      this.notificationService.warning('A senha deve ter no mínimo 6 caracteres!');
      return;
    }

    this.isLoading = true;

    this.usuarioService.cadastrar(this.novoUsuario).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado com sucesso:', response);

        const mensagem = response.message || 'Cadastro realizado com sucesso!';
        this.notificationService.success(mensagem);

        // Redireciona para o login após 1 segundo
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);

        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao cadastrar usuário:', erro);

        // Trata diferentes tipos de erro
        let mensagemErro = 'Erro ao cadastrar. Tente novamente.';

        if (erro.status === 409) {
          mensagemErro = 'Este email já está cadastrado!';
        } else if (erro.status === 400) {
          mensagemErro = 'Dados inválidos. Verifique os campos!';
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
