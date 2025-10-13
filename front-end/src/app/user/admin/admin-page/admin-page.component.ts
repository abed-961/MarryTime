import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { route } from '../../../../environments/routes';

@Component({
  selector: 'app-admin-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  route = route;
}
