import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  style: any = {};
  private cdr = inject(ChangeDetectorRef);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      const urls = ['/user/login', 'user/vendor/Tasks'];
      if (event instanceof NavigationEnd) {
        if (urls.includes(event.url)) {
          this.style = {
            position: 'fixed',
            bottom: '0',
            left: '0',
            zIndex: 1000,
            width: '100%',
          };
          this.cdr.detectChanges();
        } else {
          this.style = {}; // reset style for other routes
        }
      }
    });
  }
}
