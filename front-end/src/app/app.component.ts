import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { AlertComponent } from './layout/alert/alert.component';
import { CommonModule } from '@angular/common';
import { UserServicesService } from '../services/user/user-services.service';
import { Observable } from 'rxjs';
import { UserFullDetails } from '../interfaces/user_full_details_interface';
import { SideBarComponent } from './layout/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    CommonModule,
    AlertComponent,
    SideBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  user$!: Observable<UserFullDetails>;
  currentUrl!: string;
  footerStyle = {};
  style = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    'z-index': -1,
  };

  constructor(
    private us: UserServicesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.checkUser(route.url);
        this.currentUrl = route.url;
      }
    });
  }

  async checkUser(url: string) {
    const vendorUrls = ['/user/vendor/Tasks', '/vendor/appointments'];
    const guestUrls = ['/user/login', '/user/register', '/'];
    this.user$ = await this.us.getUser();
    this.user$.subscribe({
      next: (user) => {
        if (user.role !== 'vendor' && vendorUrls.includes(url)) {
          this.router.navigate(['/']);
        } else if (user.role == 'vendor' && url == '/client/appointments') {
          this.router.navigate(['/vendor/appointments']);
        }
        this.checkForFooter(url);
      },

      error: () => {
        if (!guestUrls.includes(url)) {
          this.router.navigate(['user/login']);
        }
      },
    });
    this.cdr.detectChanges();
  }

  checkForFooter(url: string) {
    const fixedFooter = [
      '/notifications',
      '/user/login',
      '/client/appointments',
      '/vendor/appointments',
    ];
    if (fixedFooter.includes(url)) {
      this.footerStyle = this.style;
    } else {
      this.footerStyle = {};
    }
  }
}
