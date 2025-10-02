import { ChangeDetectorRef, Component } from '@angular/core';
import { api } from '../../../environments/api';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  RouterLink,
} from '@angular/router';
import { UserServicesService } from '../../../services/user/user-services.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

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
  user?: any;

  constructor(
    private us: UserServicesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    router.events.subscribe((url) => {
      if (url instanceof NavigationEnd) {
        this.ngOnInit(url);
      }
    });
  }

  ngOnInit(url: any) {
    this.getUser();
    if (url instanceof NavigationEnd) {
      const urls = ['/user/register', '/user/login'];
      if (urls.includes(url.url) && this.user) {
        this.router.navigate(['/']);
        this.cdr.detectChanges();
      }
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getUser() {
    this.us.getUser().subscribe({
      next: (res: any) => this.checkUser(true, res),
      error: (err: any) => this.checkUser(false, err.message),
    });
  }

  checkUser(status: boolean, data: any) {
    if (status) {
      this.user = data;
    } else {
      this.user = null;
    }
    this.cdr.detectChanges();
  }

  logout() {
    this.us.logout().subscribe({
      next: (res: any) => {
        this.user = null;
        this.router.navigate(['/user/login']);
      },
      error: (err: any) => console.log(err),
    });
  }
}
