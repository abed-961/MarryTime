import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification/notification.service';
import { Notification } from '../../../interfaces/notification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (res: Notification[]) => {
        this.notifications = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load notifications.';
        this.loading = false;
      },
    });
  }

  markAsRead(notification: Notification) {
    if (!notification.readed_it) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        notification.readed_it = true;
        this.cdr.detectChanges;
      });
    }
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.readed_it).length;
  }

  deleteNotification(notification: Notification, event: Event) {
    event.stopPropagation(); // Prevent triggering markAsRead

    // Call service to delete
    this.notificationService.deleteNotification(notification).subscribe({
      next: () => {
        // Remove from local array
        this.notifications = this.notifications.filter(
          (n) => n.id !== notification.id
        );
      },
      error: (err) => {
        console.error('Failed to delete notification', err);
      },

      complete: () => {
        this.cdr.detectChanges();
      },
    });
    this.cdr.detectChanges();
  }
}
