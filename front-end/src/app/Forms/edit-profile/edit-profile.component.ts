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
import { UserFullDetails } from '../../../interfaces/user_full_details_interface';

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
  user_past_info: any;

  // --- start injection section ---
  private userService = inject(UserServicesService);
  private cdr = inject(ChangeDetectorRef);
  private alert = inject(AlertService);

  // --- end injection section ---

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
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
      this.user_past_info = user;
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
    Object.keys(this.profileForm.controls).forEach((key) => {
      const value = this.profileForm.get(key)?.value;
      if (value)
        if (this.user_past_info[key] !== value) {
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
                this.isSubmitting = false;
                this.notificationResponse(res.description, 'success');
                this.profileForm.reset();
                this.ngOnInit();
              } else {
                this.notificationResponse(res.description, 'error');
              }
            },
            error: (err) => {
              this.isSubmitting = false;
              this.handleErrors(err.error.errors);
            },
            complete: () => {
              this.isSubmitting = false;
              this.cdr.detectChanges();
            },
          });
          return;
        } else {
          console.log('nothing changed');
        }
    });
  }
  handleErrors(error: any) {
    Object.keys(error).forEach((key) => {
      console.log(error[key][0]);
      const control = this.profileForm.get(key);
      if (control) {
        control.setErrors({ server: error[key][0] });
      }
    });

    this.alert.show('something went wrong', 'error');
  }

  notificationResponse(res: string, status: 'success' | 'error' | 'info') {
    this.alert.show(res, status);
  }
  showCurrentPassword = false;
  showNewPassword = false;
  currSrc = '/assets/images/show.png';
  newSrc = '/assets/images/show.png';
  toggle1() {
    if (this.showCurrentPassword) {
      this.currSrc = '/assets/images/show.png';
    } else {
      this.currSrc = '/assets/images/hide.png';
    }

    this.showCurrentPassword = !this.showCurrentPassword;
    this.cdr.detectChanges();
  }
  toggle2() {
    if (this.showNewPassword) {
      this.newSrc = '/assets/images/show.png';
    } else {
      this.newSrc = '/assets/images/hide.png';
    }
    this.showNewPassword = !this.showNewPassword;
    this.cdr.detectChanges();
  }
}
