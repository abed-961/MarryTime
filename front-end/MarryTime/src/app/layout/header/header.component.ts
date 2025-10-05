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

  constructor(
    private us: UserServicesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.checkUser(route.url);
      }
    });
  }

  async checkUser(url: string) {
    const vendorUrls = ['/user/vendor/Tasks'];
    const guestUrls = ['/user/login', '/user/register', '/'];
    this.user$ = await this.us.getUser();
    this.user$.subscribe({
      next: (user) => {
        if (user.role !== 'vendor' && vendorUrls.includes(url)) {
          this.router.navigate(['/']);
        }
      },

      error: () => {
        if (!guestUrls.includes(url)) {
          this.router.navigate(['user/login']);
        }
      },
    });
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
