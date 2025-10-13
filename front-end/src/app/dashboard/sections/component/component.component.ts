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
  @ViewChild('suggestCard') suggestCard?: ElementRef<HTMLDivElement>;
  private scrollInterval?: number;

  ngOnInit() {
    this.user$ = this.us.getUser();
    this.appointments$ = this.as.getSuggestAppointments();
  }
}
