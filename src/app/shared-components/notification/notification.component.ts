import { Component, OnInit } from '@angular/core'; // OnInit = Interface do lifecycle hook
import { CommonModule } from '@angular/common'; // CommonModule = Diretivas comuns do Angular (ngIf, ngFor, etc)
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interfaces/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  //  Implementa a interface OnInit (obriga ter o método ngOnInit

  notifications: Notification[] = []; // Array que vai guardar as notificações para exibir no template

  constructor(private notificationService: NotificationService) { }


  // Pega o Observable do service e se inscreve para receber atualizações
  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notifications => { // Sempre que houver uma nova notificação, esse código será executado
      this.notifications = notifications; // Atualiza o array de notificações sempre que houver uma mudança
    });
  }

  // Remove notificação ao clicar no X
  close(id: string | undefined) {
    if (id) { // O if garante que só chama remove() quando tem um ID válido.
      this.notificationService.remove(id);
    }
  }

  getIcon(type: string): string {
    switch(type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return '!';
      default: return '!';
    }
  }

}