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
import { route } from '../environments/routes';

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
  route = route;
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
    const url1 = url.slice(1);
    const vendorUrls = [route.vendorTasks, route.vendor_appointments];
    const guestUrls = [route.login, `/${route.register}`, route.home];
    const adminPages = [route.admin];
    this.user$ = await this.us.getUser();
    this.user$.subscribe({
      next: (user) => {
        if (user.role !== 'vendor' && vendorUrls.includes(url1)) {
          this.router.navigate([route.home]);
        } else if (user.role == 'vendor' && url1 == route.client_appointments) {
          this.router.navigate([route.vendor_appointments]);
        } else if (user.role !== 'admin' && adminPages.includes(url1)) {
          this.router.navigate([route.home]);
        }
        // this.checkForFooter(url1);
      },

      error: () => {
        if (!guestUrls.includes(url)) {
          this.router.navigate(['user/login']);
        }
      },
    });
    this.cdr.detectChanges();
  }

  // checkForFooter(url: string) {
  //   const fixedFooter = [
  //     route.notification,
  //     route.login,
  //     route.client_appointments,
  //     route.vendor_appointments,
  //     route.suggest_appointment,
  //   ];
  //   if (fixedFooter.includes(url)) {
  //     this.footerStyle = this.style;
  //   } else {
  //     this.footerStyle = { position: 'sticky', bottom: 0 };
  //   }
  // }
}
