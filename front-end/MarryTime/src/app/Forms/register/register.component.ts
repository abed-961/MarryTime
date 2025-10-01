import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { UserServicesService } from '../../services/user/user-services.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { stat } from 'fs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles: string[] = ['client', 'vendor'];

  constructor(
    private fb: FormBuilder,
    private us: UserServicesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alertService: AlertService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
    });
  }
  passwordVisible = false;
  eyeSrc = 'assets/images/show.png';

  togglePassword() {
    if (this.passwordVisible) {
      this.eyeSrc = 'assets/images/show.png';
    } else {
      this.eyeSrc = 'assets/images/hide.png';
    }
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.us.register(this.registerForm).subscribe({
        next: (res: any) => {
          this.handleRegister(res, 'success');
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.handleErrors(err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  handleErrors(err: any) {
    const errors = err.error.errors;
    Object.keys(errors).forEach((key) => {
      this.registerForm.get(key)?.setErrors({ server: errors[key][0] });
    });
    this.handleRegister('please check your information', 'error');
  }

  handleRegister(
    res: string,
    status: 'error' | 'success' | 'info' = 'success'
  ) {
    this.alertService.show(res, status);
  }
}
