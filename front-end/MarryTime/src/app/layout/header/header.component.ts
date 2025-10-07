import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
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
  @Input() user!: UserFullDetails;
  currentUrl!: string;

  private us = inject(UserServicesService);
  private router = inject(Router);

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
