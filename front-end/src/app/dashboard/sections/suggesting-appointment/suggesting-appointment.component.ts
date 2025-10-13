import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data/data.service';
import { route } from '../../../../environments/routes';

@Component({
  selector: 'app-suggesting-appointment',
  imports: [CommonModule],
  templateUrl: './suggesting-appointment.component.html',
  styleUrl: './suggesting-appointment.component.css',
})
export class SuggestingAppointmentComponent {
  @Input() appointment: any;
  route = route;
  private dts = inject(DataService);
  private router = inject(Router);

  sendAppointment(appointment: any) {
    this.dts.sendData(appointment);
    this.router.navigate([`/${route.appointment_vendors}`]);
  }
}
