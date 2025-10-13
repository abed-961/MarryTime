import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Appointment } from '../../../../interfaces/appointment';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { api } from '../../../../environments/api';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data/data.service';
import { route } from '../../../../environments/routes';

@Component({
  selector: 'app-vendor-appointments',
  imports: [CommonModule],
  templateUrl: './vendor-appointments.component.html',
  styleUrls: ['./vendor-appointments.component.css'],
})
export class VendorAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error = '';
  photoUrl = api.photo_url;
  route = route;

  constructor(
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef,
    private dataService: DataService,
    private router: Router
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

  sendToVendors(data: any) {
    this.dataService.sendData(data);
    this.router.navigate([route.appointment_vendors]);
  }
}
