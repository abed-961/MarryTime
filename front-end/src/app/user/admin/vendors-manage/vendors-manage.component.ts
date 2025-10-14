import { Component, inject } from '@angular/core';
import { AdminService } from '../../../../services/user/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendors-manage',
  imports: [CommonModule],
  templateUrl: './vendors-manage.component.html',
  styleUrl: './vendors-manage.component.css',
})
export class VendorsManageComponent {
  vendors: any;
  loading: any;
  private adService = inject(AdminService);
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.adService.getVendors().subscribe({
      next: (data) => {
        this.vendors = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  goToVendor(vendor: any) {
    this.router.navigate([`user/admin/show/${vendor.id}/vendor`]);
  }
}
