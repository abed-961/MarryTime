import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {
  AlertMessage,
  AlertService,
} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  message: string | null = null;
  type: 'success' | 'error' | 'info' = 'success';

  constructor(
    private cdr: ChangeDetectorRef,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alertService.alert$.subscribe((alert: AlertMessage) => {
      this.message = alert.message;
      this.type = alert.type;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.message = null;
        this.cdr.detectChanges();
      }, 3000);
    });
  }
}
