import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-suggesting-appointment',
  imports: [CommonModule, RouterLink],
  templateUrl: './suggesting-appointment.component.html',
  styleUrl: './suggesting-appointment.component.css',
})
export class SuggestingAppointmentComponent {
  @Input() appointment: any;
}
