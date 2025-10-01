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

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles: string[] = ['client', 'vendor'];

  constructor(
    private fb: FormBuilder,
    private us: UserServicesService,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.us.register(this.registerForm).subscribe({
        next: (res: any) => {
          console.log(res);
          this.cdr.detectChanges();
        },
        error: (err: any) => this.handleErrors(err),
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  handleErrors(err: any) {
    const errors = err.error.errors;
    Object.keys(errors).forEach((key) => {
      this.registerForm.get(key)?.setErrors({ 'server': errors[key][0] });
    });
  }
}
