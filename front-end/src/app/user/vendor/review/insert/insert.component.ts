import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../../../../services/Review/Review.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonEngine } from '@angular/ssr/node';
import { CommonModule } from '@angular/common';
import { VendorService } from '../../../../../services/user/vendor.service';

@Component({
  selector: 'app-insert',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css',
})
export class InsertComponent implements OnInit {
  vendorId!: number;
  reviewFrom!: FormGroup;
  router = inject(Router);
  vendor!: any;

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private vendorService: VendorService
  ) {
    this.reviewFrom = fb.group({
      ration: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.vendorId = Number(this.route.snapshot.paramMap.get('id'));
    this.vendorService.getVendorById(this.vendorId).subscribe({
      next: (data: any) => {
        this.vendor = data;
      },
    });
  }

  submitReview() {
    this.errorMessage = '';
    this.successMessage = '';

    this.loading = true;

    this.reviewService
      .insertReview(this.vendorId, this.reviewFrom.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = 'Feedback submitted successfully!';
          this.reviewFrom.reset();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage =
            err.error?.message ||
            'An error occurred while submitting feedback.';
        },
      });
  }
}
