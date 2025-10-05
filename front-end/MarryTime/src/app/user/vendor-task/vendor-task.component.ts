import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  VendorTask,
  Task,
} from '../../../interfaces/user_full_details_interface';
import { VendorService } from '../../../services/user/vendor.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-vendor-tasks',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendor-task.component.html',
  styleUrl: './vendor-task.component.css',
})
export class VendorTaskComponent implements OnInit {
  formTask: FormGroup;
  vendorId!: number;
  tasks$!: Observable<VendorTask[]>;
  filteredTasks: Task[] = [];

  private vs = inject(VendorService);
  private cdr = inject(ChangeDetectorRef);
  private alertService = inject(AlertService);

  constructor(private fb: FormBuilder) {
    this.formTask = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      due_date: [''],
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.vs.getVendorId().subscribe((res: any) => (this.vendorId = res));
    this.tasks$ = this.vs.loadTasks();
    this.cdr.detectChanges();
  }

  addTask(vendor_id: number) {
    if (this.formTask.valid) {
      this.vs.addTask(this.formTask.value, vendor_id).subscribe({
        next: (res: any) => {
          this.notification(res.description, 'success');
          this.formTask.reset();
          this.loadTasks();
        },
        error: (err) => {
          this.notification('something went wrong', 'error');
          this.handleErrors(err);
        },
        complete: () => {
          this.loadTasks();
        },
      });
    } else {
      console.log('invalid', this.formTask.value);
    }
  }

  handleErrors(err: any) {
    const errors = err.error.errors;
    Object.keys(errors).forEach((key) => {
      this.formTask.get(key)?.setErrors({ server: errors[key][0] });
    });
  }

  notification(
    message: string,
    status: 'error' | 'success' | 'info' = 'success'
  ) {
    this.alertService.show(message, status);
  }

  applyFilter(data: Event) {
    const filter = data.target as HTMLInputElement;
    this.tasks$ = this.vs.filter(filter.value);
  }

  startTask(task: any) {
    this.updateTaskStatus(task, 'in_progress');
  }

  markAsCompleted(task: any) {
    this.updateTaskStatus(task, 'completed');
  }

  private updateTaskStatus(
    id: number,
    status: 'pending' | 'in_progress' | 'completed'
  ) {
    this.vs.updateTasksStatus(id, status).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.notification(res.description.success);
          this.ngOnInit();
        }
      },
      error: (err: any) => {
        this.notification('there is an error while changing', 'error');
      },
    });
  }

  deleteTask(taskId: number) {
    this.vs.deleteTask(taskId).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.notification(res.description, 'success');
          this.ngOnInit();
        }
      },
      error: (err: any) => {
        this.notification('there is an error while deleting', 'error');
      },
    });
  }
}
