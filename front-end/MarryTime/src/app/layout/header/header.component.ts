import { Component } from '@angular/core';
import { api } from '../../../environments/api';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  api = api.url;
}
