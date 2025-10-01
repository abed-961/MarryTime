import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  style: any = {};

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/user/login') {
          this.style = {
            position: 'fixed',
            bottom: '0',
            left: '0',
            zIndex: 1000,
            width: '100%',
          };
        } else {
          this.style = {}; // reset style for other routes
        }
      }
    });
  }
}
