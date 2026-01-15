import { Component } from '@angular/core';
import { UsuarioCadastro } from '../../interfaces/usuario';
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
  novoUsuario: UsuarioCadastro = {
    nome: '',
    email: '',
    senha: '',
    dataCadastro: new Date()
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

  cadastrar(){
    this.usuarioService.cadastrar(this.novoUsuario).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado com sucesso:', response);
        this.notificationService.success('Cadastro realizado com sucesso!');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 500); // Aguarda 500ms antes de navegar
      },
      error: (erro: any) => {
        console.error('Erro ao cadastrar usuário:', erro);
        this.notificationService.handleHttpError(erro);
      }
    });
  }
}
