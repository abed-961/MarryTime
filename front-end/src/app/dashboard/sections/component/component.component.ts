import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { UserProfileViewComponent } from '../user-profile-view/user-profile-view.component';
import { WeddingPicturesComponent } from '../wedding-pictures/wedding-pictures.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserFullDetails } from '../../../../interfaces/user_full_details_interface';
import { UserServicesService } from '../../../../services/user/user-services.service';
import { TasksBoardComponent } from '../tasks-board/tasks-board.component';
import { PersonalizedComponent } from '../personalized/personalized.component';
import { ReviewComponent } from '../../../user/vendor/review/review.component';
import { FormsModule } from '@angular/forms';

import { SuggestingAppointmentComponent } from '../suggesting-appointment/suggesting-appointment.component';
import { AdminService } from '../../../../services/user/admin.service';
import { AppointmentService } from '../../../../services/appointment/appointment.service';

@Component({
  selector: 'app-component',
  imports: [
    UserProfileViewComponent,
    WeddingPicturesComponent,
    CommonModule,
    TasksBoardComponent,
    PersonalizedComponent,
    ReviewComponent,
    FormsModule,
    SuggestingAppointmentComponent,
  ],
  templateUrl: './component.component.html',
  styleUrl: './component.component.css',
})
export class ComponentComponent implements OnInit {
  appointments$!: Observable<any>;
  user$!: Observable<UserFullDetails>;
  private us = inject(UserServicesService);
  private as = inject(AdminService);

  ngOnInit() {
    this.user$ = this.us.getUser();
    this.appointments$ = this.as.getSuggestAppointments();
    this.appointments$.subscribe((res) => console.log(res));
  }

  @ViewChild('carousel') carousel!: ElementRef;

  cardWidth = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      const firstCard =
        this.carousel.nativeElement.querySelector('.carousel-card');
      if (firstCard) {
        this.cardWidth = firstCard.offsetWidth;
      }
      this.interval();
    }, 1000);
  }

  interval() {
    setInterval(() => {
      const carouselEl = this.carousel.nativeElement;
      const maxScroll = carouselEl.scrollWidth - carouselEl.clientWidth;

      if (carouselEl.scrollLeft + this.cardWidth < maxScroll) {
        // scroll right by one card
        carouselEl.scrollBy({
          left: this.cardWidth,
          behavior: 'smooth',
        });
      } else {
        // scroll back to start
        carouselEl.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 2000);
  }
  next() {
    this.carousel.nativeElement.scrollBy({
      left: this.cardWidth,
      behavior: 'smooth',
    });
  }

  prev() {
    this.carousel.nativeElement.scrollBy({
      left: -this.cardWidth,
      behavior: 'smooth',
    });
  }
}
