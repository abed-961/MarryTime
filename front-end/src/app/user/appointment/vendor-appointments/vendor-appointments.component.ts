import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Appointment } from '../../../../interfaces/appointment';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { api } from '../../../../environments/api';
import { RouterLink } from '@angular/router';
import { AppointmentFormComponent } from "../../../Forms/appointment-form/appointment-form.component";

@Component({
  selector: 'app-vendor-appointments',
  imports: [CommonModule, RouterLink, AppointmentFormComponent],
  templateUrl: './vendor-appointments.component.html',
  styleUrls: ['./vendor-appointments.component.css'],
})
export class VendorAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error = '';
  photoUrl = api.photo_url;

  constructor(
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.loading = true;
    this.appointmentService.getAppointments().subscribe({
      next: (data: any) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load appointments';
        this.loading = false;
      },
    });
  }

  getStatusClass(status: string): string {
    return (
      {
        pending: 'status-pending',
        completed: 'status-completed',
        cancelled: 'status-cancelled',
      }[status] || ''
    );
  }

  refuseAppointment(id: number) {
    this.appointmentService.refuseAppointment(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.fetchAppointments();
      },
    });
  }
}
