import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorTask } from '../../../../interfaces/user_full_details_interface';
import { VendorService } from '../../../../services/user/vendor.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks-board',
  imports: [CommonModule, RouterLink],
  templateUrl: './tasks-board.component.html',
  styleUrl: './tasks-board.component.css',
})
export class TasksBoardComponent {
  tasks$!: Observable<VendorTask[]>;

  private vs = inject(VendorService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.vs.loadTasks();

    this.cdr.detectChanges();
  }
}
