import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertMessage {
  message: string;
  type: 'success' | 'error' | 'info';
}
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<AlertMessage>();
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.alertSubject.next({ message, type });
  }
}
