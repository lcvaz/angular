import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent)
    }
];
