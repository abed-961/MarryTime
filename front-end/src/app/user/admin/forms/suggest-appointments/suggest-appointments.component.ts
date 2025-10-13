import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppointmentService } from '../../../../../services/appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../../services/user/admin.service';
import { error } from 'console';
import { AlertService } from '../../../../../services/alert/alert.service';

@Component({
  selector: 'app-suggest-appointments',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './suggest-appointments.component.html',
  styleUrl: './suggest-appointments.component.css',
})
export class SuggestAppointmentsComponent {
  form!: FormGroup;
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  selectedAppointment: any = null;
  showDropdown = false;
  loading = false;
  @ViewChild('inputValue') appointmentInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private as: AdminService,
    private alertServ: AlertService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.form = this.fb.group({
      appointment_id: ['', Validators.required],
    });

    this.getAppointments();
  }

  getAppointments() {
    this.loading = true;
    this.appointmentService.loadAppointments().subscribe({
      next: (data: any) => {
        console.log(data);
        this.appointments = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  filterAppointments(value: string) {
    this.filteredAppointments = this.appointments.filter(
      (app) =>
        app.location.toLowerCase().includes(value.toLowerCase()) ||
        app.status.toLowerCase().includes(value.toLowerCase())
    );
  }

  selectAppointment(app: any) {
    this.selectedAppointment = app;
    this.form.patchValue({ appointment_id: app.id });
    this.showDropdown = false;
  }

  submit() {
    if (this.form.valid) {
      this.as.insertAppointmentSuggest(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.showAlert('success', res.description);
            if (this.appointmentInput) {
              this.appointmentInput.nativeElement.value = '';
            }

            this.showDropdown = false;
            this.cdr.detectChanges();
          }
        },
        error: (err: any) => {
          this.showAlert('danger', err.errors.error[0]);
        },
      });
    }
  }

  hideDropDown() {
    setTimeout(() => (this.showDropdown = false), 150);
  }

  showAlert(status: any, message: any) {
    this.alertServ.show(message, status);
  }
}
