import { Component, OnInit } from '@angular/core';
import { api } from '../../../environments/api';
import { ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { UserServicesService } from '../../services/user/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  api = api.url;
  menuOpen = false;
  user: any;

  constructor(private us: UserServicesService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((url) => {
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

  checkUser(status : boolean , data : any) {
    if (status) {
      this.user = data;
    }else {
      
    }
  }
}
