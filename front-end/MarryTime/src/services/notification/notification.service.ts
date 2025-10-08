import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { api } from '../../environments/api';
import { Notification } from '../../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  api = api.url;
  private http = inject(HttpClient);

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.api}/api/notifications`, {
      withCredentials: true,
    });
  }

  markAsRead(id: number): Observable<any> {
    return this.http.post(
      `${this.api}/api/notifications/${id}/read`,
      {},
      { withCredentials: true }
    );
  }

  deleteNotification(n: Notification) {
    return this.http.delete(`${this.api}/api/${n.id}/notifications`, {
      withCredentials: true,
    });
  }
}
