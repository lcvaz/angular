import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  constructor() {}

  /**
   * Mostra uma notificação de sucesso
   */
  success(message: string, duration: number = 5000): void {
    this.show({
      id: this.generateId(),
      type: 'success',
      message,
      duration
    });
  }

  /**
   * Mostra uma notificação de erro
   */
  error(message: string, duration: number = 5000): void {
    this.show({
      id: this.generateId(),
      type: 'error',
      message,
      duration
    });
  }

  /**
   * Mostra uma notificação informativa
   */
  info(message: string, duration: number = 5000): void {
    this.show({
      id: this.generateId(),
      type: 'info',
      message,
      duration
    });
  }

  /**
   * Mostra uma notificação de alerta
   */
  warning(message: string, duration: number = 5000): void {
    this.show({
      id: this.generateId(),
      type: 'warning',
      message,
      duration
    });
  }

  /**
   * Adiciona uma notificação à lista e agenda sua remoção
   */
  private show(notification: Notification): void {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Remove a notificação após o tempo especificado
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, notification.duration);
    }
  }

  /**
   * Remove uma notificação específica
   */
  remove(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next(
      currentNotifications.filter(n => n.id !== id)
    );
  }

  /**
   * Remove todas as notificações
   */
  clear(): void {
    this.notificationsSubject.next([]);
  }

  /**
   * Gera um ID único para a notificação
   */
  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
