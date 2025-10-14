import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../services/user/admin.service';
import { AlertService } from '../../../../services/alert/alert.service';

@Component({
  selector: 'app-insert-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insert-category.component.html',
  styleUrl: './insert-category.component.css',
})
export class InsertCategoryComponent {
  categoryForm: FormGroup;
  loading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private adService: AdminService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.adService.addCategory(this.categoryForm.value).subscribe({
      next: (res) => {
        if (res.status) {
          this.message = res.message;
          this.loading = false;
          this.categoryForm.reset();
          this.notification(res.description, 'success');
        } else {
          this.notification(res.description, 'error');
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.handleErrors(err);
        this.notification('something went wrong', 'error');
        this.cdr.detectChanges();
      },
    });
  }

  notification(data: string, status: any) {
    this.alertService.show(data, status);
  }

  handleErrors(err: any) {
    const errors = err.error.errors;
    Object.keys(errors).forEach((key) => {
      this.categoryForm.get(key)?.setErrors({ server: errors[key][0] });
    });
  }
}
