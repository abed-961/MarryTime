import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../../../interfaces/appointment';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from '../../../Forms/appointment-form/appointment-form.component';
import { Observable } from 'rxjs';
import { DataService } from '../../../../services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-appointments',
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.css'],
})
export class ClientAppointmentsComponent implements OnInit {
  appointments$!: Observable<Appointment[]>;
  showForm = false;
  private cdr = inject(ChangeDetectorRef);
  private dataService = inject(DataService);
  private router = inject(Router);

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments$ = this.appointmentService.getAppointments();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onAppointmentCreated() {
    this.showForm = false;
    this.loadAppointments();
  }

  goToAppointmentsService(appt: any) {
    this.dataService.sendData(appt);
    this.router.navigate(['user/appointment/vendors'])

  }
}
