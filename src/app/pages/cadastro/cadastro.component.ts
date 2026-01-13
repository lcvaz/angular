import { Component, Input, Output } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
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

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  mostrandoSenha: boolean = false;

  mostrarSenha(): void {
    this.mostrandoSenha = !this.mostrandoSenha;
  }

  cadastrar(){
    this.usuarioService.cadastrar(this.novoUsuario).subscribe({
      next: (response: any) => {
        console.log('Usuário cadastrado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (erro: any) => {
        console.error('Erro ao cadastrar usuário:', erro);
        alert('Erro ao cadastrar! Verifique os dados.');
      }
    });
  }
}
