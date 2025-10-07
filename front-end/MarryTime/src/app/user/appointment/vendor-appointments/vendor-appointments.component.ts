import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../../interfaces/appointment';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vendor-appointments',
  imports : [CommonModule],
  templateUrl: './vendor-appointments.component.html',
  styleUrls: ['./vendor-appointments.component.css']
})
export class VendorAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.loading = true;
    this.appointmentService.getAppointments().subscribe({
      next: (data :any ) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err : any) => {
        this.error = 'Failed to load appointments';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    return {
      pending: 'status-pending',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    }[status] || '';
  }
}
