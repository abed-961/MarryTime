import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  NgZone,
  inject,
} from '@angular/core';

import { route } from '../../../../environments/routes';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert/alert.service';

@Component({
  selector: 'app-shortcuts',
  imports: [CommonModule],
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.css',
})
export class ShortcutsComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  private ngZone = inject(NgZone);
  private router = inject(Router);
  private alertS = inject(AlertService);
  @Input() user: any;
  route = route;
  buttonsInterval: any;
  resumeTimeout: any;
  @Input() buttons: {
    label: string;
    icon?: string;
    action?: () => void;
    restrict?: any;
  }[] = [
    {
      label: 'View Event',
      restrict: ['vendor'],
      action: () =>
        this.router.navigate([`/${this.route.vendor_appointments}`]),
    },
    {
      label: 'Upload Photos',
      action: () => this.profileSetting(),
    },
    {
      label: 'View Tasks',
      restrict: ['vendor'],
      action: () => this.router.navigate([`/${this.route.vendorTasks}`]),
    },
    {
      label: 'Create appointment',
      restrict: ['user'],
      action: () =>
        this.router.navigate([`/${this.route.client_appointments}`]),
    },
    {
      label: 'Manage Users',
      restrict: ['admin'],
      action: () => this.router.navigate([`/${this.route.manageUser}`]),
    },
    {
      label: 'Settings',
      action: () => this.profileSetting(),
    },
    {
      label: 'Notifications',
      action: () => this.router.navigate([`/${this.route.notification}`]),
      restrict: 'client',
    },
    { label: 'Help' },
  ];

  @ViewChild('buttonsContainer') buttonsContainer!: ElementRef<HTMLDivElement>;
  ngOnInit() {
    this.buttons = [
      ...this.buttons,
      ...this.buttons,
      ...this.buttons,
      ...this.buttons,
      ...this.buttons,
      ...this.buttons,
      ...this.buttons,
    ];
  }
  ngAfterViewInit() {
    const container = this.buttonsContainer.nativeElement;

    // Start scrolling automatically
    this.ngZone.runOutsideAngular(() => this.setTime());

    // Listen to user scroll activity
    container.addEventListener('mousemove', () => this.stopInterval());
  }
  direction = true; // true = right, false = left

  setTime() {
    const container = this.buttonsContainer.nativeElement;
    const maxScroll = container.scrollWidth - container.clientWidth;

    this.buttonsInterval = setInterval(() => {
      // Scroll by 2px per tick for smooth animation
      container.scrollLeft += this.direction ? 2 : -2;

      // Loop back when reaching the end
      if (container.scrollLeft >= maxScroll) {
        this.stopInterval();
        container.scrollLeft = 0; // jump back to start
      }

      // Optional: reverse direction (ping-pong effect)
      // if (container.scrollLeft <= 0) this.direction = true;
      // if (container.scrollLeft >= maxScroll) this.direction = false;
    }, 20);
  }

  stopInterval() {
    // Clear current scrolling interval
    clearInterval(this.buttonsInterval);
    this.buttonsInterval = null;

    // Clear any pending resume
    clearTimeout(this.resumeTimeout);

    // Resume after 3 seconds of inactivity
    this.resumeTimeout = setTimeout(() => {
      this.ngZone.runOutsideAngular(() => this.setTime());
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.buttonsInterval);
    clearTimeout(this.resumeTimeout);
  }

  profileSetting() {
    this.router.navigate([`/${this.route.editProfile}`]);
  }

  unvailable() {
    this.alertS.show('this feature will be available soon', 'info');
  }

  canAccess(btn: any) {
    if (!btn.restrict) return true; // No restriction, visible to all
    return btn.restrict.includes(this.user.role);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
