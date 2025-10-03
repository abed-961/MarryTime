import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService } from '../../../services/user/user-services.service';
import { api } from '../../../environments/api';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../services/alert/alert.service';
import { UnaryFunction } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  profileForm!: FormGroup;
  isSubmitting = false;
  previewUrl: string | ArrayBuffer | null = null;

  photo_path = api.photo_url;

  // --- start injection section ---
  private userService = inject(UserServicesService);
  private cdr = inject(ChangeDetectorRef);
  private alert = inject(AlertService);

  // --- end injection section ---

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+?[0-9]{1,3}[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/
          ),
        ],
      ],
      current_password: [''],
      new_password: [''],
      role: ['client', Validators.required],
      photo: [null],
    });

    this.userService.getUser().subscribe((user: any) => {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
      this.previewUrl = this.photo_path + user.photo;

    });
  }

  // Handle file input change
  onFileSelected(event: any) {
    const file = event.target?.files[0];
    this.profileForm.patchValue({
      photo: file,
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.cdr.detectChanges();

    const formData = new FormData();
    Object.keys(this.profileForm.controls).forEach((key) => {
      const value = this.profileForm.get(key)?.value;
      if (value) {
        formData.append(key, value);
      }
    });

    this.userService.updateUser(formData).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.notificationResponse(res.description, 'success');
          this.ngOnInit();
        } else {
          this.notificationResponse(res.description, 'error');
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
    });
  }

  notificationResponse(res: string, status: 'success' | 'error' | 'info') {
    this.alert.show(res, status);
  }
}
