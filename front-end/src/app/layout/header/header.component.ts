import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { api } from '../../../environments/api';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { UserServicesService } from '../../../services/user/user-services.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import { UserFullDetails } from '../../../interfaces/user_full_details_interface';
import { route } from '../../../environments/routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent {
  route = route;
  api = api.url;
  menuOpen = false;
  @Input() user!: UserFullDetails;
  @Input() currentUrl!: string;

  private us = inject(UserServicesService);
  private router = inject(Router);

  toggle = true;
  toggleMenu() {
    this.toggle = !this.toggle;
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.us.logout().subscribe({
      next: () => {
        this.router.navigate([route.login]);
      },
    });
  }
}
