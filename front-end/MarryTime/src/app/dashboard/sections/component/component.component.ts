import { Component, inject, OnInit } from '@angular/core';
import { UserProfileViewComponent } from '../user-profile-view/user-profile-view.component';
import { WeddingPicturesComponent } from '../wedding-pictures/wedding-pictures.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserFullDetails } from '../../../../interfaces/user_full_details_interface';
import { UserServicesService } from '../../../../services/user/user-services.service';
import { TasksBoardComponent } from '../tasks-board/tasks-board.component';

@Component({
  selector: 'app-component',
  imports: [
    UserProfileViewComponent,
    WeddingPicturesComponent,
    CommonModule,
    TasksBoardComponent,
  ],
  templateUrl: './component.component.html',
  styleUrl: './component.component.css',
})
export class ComponentComponent implements OnInit {
  user$!: Observable<UserFullDetails>;
  private us = inject(UserServicesService);
  ngOnInit() {
    this.user$ = this.us.getUser();
  }
}
