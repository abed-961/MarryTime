import { Component, OnInit } from '@angular/core';
import { api } from '../../../environments/api';
import {
  ActivatedRoute,
  NavigationEnd,
  RouterLink,
  Router,
} from '@angular/router';
import { UserServicesService } from '../../services/user/user-services.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  api = api.url;
  menuOpen = false;
  user: any;

  constructor(private us: UserServicesService, router: Router) {
    router.events.subscribe((url) => {
      if (url instanceof NavigationEnd) {
        this.getUser();
      }
    });
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
      console.log(this.user);
    } else {
      console.log('not loggedIN');
    }
  }
}
