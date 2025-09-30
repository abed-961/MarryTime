import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { UserServicesService } from '../../services/user/user-services.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    });
  }

  submit() {
    if (this.registerForm.valid) {
      this.us.register(this.registerForm).subscribe({
        next: (res: any) => {
          console.log(res);
          this.cdr.detectChanges();
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
