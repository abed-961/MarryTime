import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Notification } from '../../../interfaces/notification';
import { CommonModule } from '@angular/common';
import { UserFullDetails } from '../../../interfaces/user_full_details_interface';
import { NotificationService } from '../../../services/notification/notification.service';
import { Observable } from 'rxjs';
import { route } from '../../../environments/routes';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  route = route
  @Input() username: string = 'not logged in';
  @Input() currenUrl!: string;
  showNotifications = false;
  notifications$!: Observable<Notification[]>;
  notifications!: Notification[];

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadNotifications();
  }

  async loadNotifications() {
    this.notifications$ = await this.notificationService.getNotifications();
    this.notifications$.subscribe((notifications) => {
      this.takeUnreadMessage(notifications);
    });
  }

  markAsRead(notification: Notification) {
    if (!notification.readed_it) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        notification.readed_it = true;
      });
    }
    this.cdr.detectChanges();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  takeUnreadMessage(notifications: Notification[]) {
    this.notifications = notifications.filter(
      (notification) => !notification.readed_it
    );
  }
}
