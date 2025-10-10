import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Vendor } from '../../../../interfaces/user_full_details_interface';
import { UserServicesService } from '../../../../services/user/user-services.service';
import { CommonModule } from '@angular/common';
import { api } from '../../../../environments/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../services/data/data.service';
import { ReviewService } from '../../../../services/Review/Review.service';

@Component({
  selector: 'app-vendor-page',
  imports: [CommonModule],
  templateUrl: './vendor-page.component.html',
  styleUrl: './vendor-page.component.css',
})
export class VendorPageComponent {
  photoUrl = api.photo_url;
  vendors: Vendor[] = [];
  loading = false;
  error: string | null = null;
  appointment!: any;

  private DataRecieve = inject(DataService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private reviewService = inject(ReviewService);

  ngOnInit(): void {
    this.fetchVendors();
  }

  fetchVendors(): void {
    this.loading = true;
    this.error = null;
    this.DataRecieve.currentMessage.subscribe({
      next: (data: any) => {
        if (data) {
          this.appointment = data;
          this.vendors = data.vendors;
          this.loading = false;
        } else {
          this.router.navigate(['client/appointments']);
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load vendors.';
        this.loading = false;
      },

      complete: () => {
        this.cdr.detectChanges();
      },
    });
  }

  sendReviewPage(id: number) {
    this.router.navigate([`vendor/${id}/review`]);
  }
}
