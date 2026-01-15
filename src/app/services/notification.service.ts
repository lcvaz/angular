import { Injectable } from '@angular/core'; // "Ei, essa classe pode ser injetada em outros componentes!"
import { BehaviorSubject, Observable } from 'rxjs'; // "Vamos usar RxJS para gerenciar o estado das notificações!"
// "BehaviorSubject é ótimo para manter o estado atual e emitir novos valores!"
// "Observable é a base para fluxos de dados assíncronos!"
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  // "Aqui estamos criando um BehaviorSubject para armazenar a lista de notificações!"

  public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();
  // "Transformamos o BehaviorSubject em um Observable público para que outros componentes possam se inscrever nele!"

  constructor() { }

  private show(notification: Notification) {
    notification.id = this.generateId();

    notification.duration = notification.duration || 5000;

    const currentNotifications = this.notificationsSubject.value;
    // "Pegamos as notificações atuais! Se já tem 2 notificações na tela, currentNotifications será um array com 2 elementos"

    this.notificationsSubject.next([...currentNotifications, notification]);
    //this.notificationsSubject.next() = Envia um novo valor para todos os inscritos
    //[...currentNotifications, notification] = Cria um novo array com as notificações atuais + a nova notificação

    setTimeout(() => {
      this.remove(notification.id!);
    }, notification.duration);

    // "Depois de 'duration' milissegundos, removemos a notificação automaticamente!"
    // "O '!' após notification.id indica ao TypeScript que temos certeza de que id não é undefined aqui!"

    
  }

  handleHttpError(error: any) {
    let message = 'Ocorreu um erro. Tente novamente.';

    // Verifica o status code
    if (error.status === 0) {
      message = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    } else if (error.status === 400) {
      message = error.error?.message || 'Dados inválidos. Verifique os campos.';
    } else if (error.status === 401) {
      message = 'Email ou senha incorretos.';
    } else if (error.status === 403) {
      message = 'Você não tem permissão para realizar esta ação.';
    } else if (error.status === 404) {
      message = 'Recurso não encontrado.';
    } else if (error.status === 409) {
      message = error.error?.message || 'Este email já está cadastrado.';
    } else if (error.status === 500) {
      message = 'Erro no servidor. Tente novamente mais tarde.';
    } else if (error.error?.message) {
      message = error.error.message;
    }

    this.error(message);
  }

  success(message: string, duration?: number) {
    this.show({
      type: 'success',
      message,
      duration
    });
  }

  error(message: string, duration?: number) {
    this.show({
      type: 'error',
      message,
      duration
    });
  }

  warning(message: string, duration?: number) {
    this.show({
      type: 'warning',
      message,
      duration
    });
  }

  info(message: string, duration?: number) {
    this.show({
      type: 'info',
      message,
      duration
    });
  }

  remove(id: string) {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.map(notification => //map() = Cria um NOVO array transformando cada elemento
      notification.id === id
        ? { ...notification, isClosing: true }  // Marca como saindo
        : notification
    );

    // Emite o array atualizado com isClosing: true para ativar a animação CSS
    this.notificationsSubject.next(updatedNotifications);

    setTimeout(() => {
      const filtered = this.notificationsSubject.value.filter(n => n.id !== id);
      this.notificationsSubject.next(filtered);
    }, 300); // ← Tempo da animação CSS
  }

  clear() {
    this.notificationsSubject.next([]);
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    // "Gera um ID único combinando o timestamp atual com uma string aleatória!"
  }

  
}