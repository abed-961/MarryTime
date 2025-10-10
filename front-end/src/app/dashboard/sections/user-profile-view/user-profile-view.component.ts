import { Component, inject } from '@angular/core';
import {
  UserFullDetails,
  Vendor,
} from '../../../../interfaces/user_full_details_interface';
import { Observable, UnaryFunction } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserServicesService } from '../../../../services/user/user-services.service';
import { RouterLink } from '@angular/router';
import { api } from '../../../../environments/api';

@Component({
  selector: 'app-user-profile-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile-view.component.html',
  styleUrl: './user-profile-view.component.css',
})
export class UserProfileViewComponent {
  // --- injections Start ---
  private us = inject(UserServicesService);
  // --- injections End ---
  user$!: Observable<UserFullDetails>;
  vendors!: Vendor[] | undefined[];
  photo_url = api.photo_url;

  ngOnInit() {
    this.user$ = this.us.getUserDashboard();
    this.user$.subscribe((user) => {
      // Normalize to array
      this.vendors = Array.isArray(user.vendor) ? user.vendor : [user.vendor];
    });
  }

  trackByVendor(index: number, vendor: any) {
    return vendor.id;
  }

  editProfile() {
    console.log('Edit profile clicked');
  }

  manageServices() {
    console.log('Manage services clicked');
  }

  viewVendors() {
    console.log('View vendors clicked');
  }
}
