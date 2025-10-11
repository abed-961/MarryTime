import { ChangeDetectorRef, Component } from '@angular/core';
import { Review } from '../../../../interfaces/review';
import { ReviewService } from '../../../../services/Review/Review.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { route } from '../../../../environments/routes';

@Component({
  selector: 'app-review',
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  route = route;
  feedbacks: Review[] = [];
  loading = true;
  error: string | null = null;
  show = true;

  constructor(
    private feedbackService: ReviewService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.check(event.urlAfterRedirects);
      }
    });
    this.check(this.router.url);
  }

  check(url: string) {
    if (url !== '/') {
      this.getAll();
      this.show = false;
    } else {
      this.getReviews();
      this.show = true;
    }
  }

  getReviews() {
    this.feedbackService.getLatest().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Unable to load feedbacks';
        this.loading = false;
      },
    });
  }

  getAll() {
    this.feedbackService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.feedbacks = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Unable to load feedbacks';
        this.loading = false;
      },
    });
  }

  go() {
    this.router.navigate([`${this.route.feedbacks}`]);
  }
}
