import { ChangeDetectorRef, Component } from '@angular/core';
import { api } from '../../../environments/api';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { UserServicesService } from '../../../services/user/user-services.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import { UserFullDetails } from '../../../interfaces/user_full_details_interface';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent {
  api = api.url;
  menuOpen = false;
  user$!: Observable<UserFullDetails>;
  currentUrl!: string;

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
      },

      error: () => {
        if (!guestUrls.includes(url)) {
          this.router.navigate(['user/login']);
        }
      },
    });
    this.cdr.detectChanges();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.us.logout().subscribe({
      next: () => {
        this.router.navigate(['/user/login']);
      },
    });
  }
}
