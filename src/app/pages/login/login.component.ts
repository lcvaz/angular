import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  usuario: Usuario = {
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

  login() {}

}
