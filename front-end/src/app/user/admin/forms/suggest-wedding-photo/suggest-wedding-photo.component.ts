import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../../../services/user/admin.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../../services/alert/alert.service';

@Component({
  selector: 'app-suggest-wedding-photo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suggest-wedding-photo.component.html',
  styleUrl: './suggest-wedding-photo.component.css',
})
export class SuggestWeddingPhotoComponent {
  uploadForm: FormGroup;
  selectedFile!: File | null;
  preview: string | ArrayBuffer | null = null;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private ad: AdminService,
    private alert: AlertService
  ) {
    this.uploadForm = this.fb.group({
      caption: ['', Validators.required],
      photo: [''],
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  onSubmit() {
    if (!this.uploadForm.valid || !this.selectedFile) return;
    const data = new FormData();
    data.append('caption', this.uploadForm.get('caption')?.value);
    data.append('photo', this.selectedFile);

    this.ad.uploadPhoto(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.alert.show(res.description, 'success');
          this.uploadForm.reset();
          this.selectedFile = null;
        } else {
          this.alert.show(res.description, 'error');
        }
      },
      error: (err: any) => {
        this.handleError(err);
      },
    });
  }
  handleError(err: any) {
    const errors = err.error.errors;
    Object.keys(errors).forEach((key) => {
      this.uploadForm.get(key)?.setErrors({ server: errors[key][0] });
    });
  }
}
