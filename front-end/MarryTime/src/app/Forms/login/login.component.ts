import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserServicesService } from '../../../services/user/user-services.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private us: UserServicesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
    if (this.loginForm.valid) {
      this.us.login(this.loginForm).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.loginNotification(res.description, 'success');
            this.router.navigate(['/']);
          } else {
            this.loginNotification(res.description, 'error');
          }
        },
        error: (err: any) => this.handleErrors(err),
        complete: () => {
          this.cdr.detectChanges();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  handleErrors(err: any) {
    const errors = err.error.errors;
    Object.keys(errors).forEach((key) => {
      this.loginForm.get(key)?.setErrors({ server: errors[key][0] });
    });
  }

  loginNotification(
    message: string,
    status: 'error' | 'success' | 'info' = 'success'
  ) {
    this.alertService.show(message, status);
  }
}
