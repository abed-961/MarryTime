import { Injectable } from '@angular/core';
import { api } from '../../environments/api';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  UserFullDetails,
  Vendor,
} from '../../interfaces/user_full_details_interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  api = api.url;
  constructor(private http: HttpClient) {}

  insertAppointmentSuggest(data: any) {
    return this.http.post(`${this.api}/api/appointment/suggest`, data, {
      withCredentials: true,
    });
  }

  getSuggestAppointments(): Observable<any> {
    return this.http.get(`${this.api}/api/appointment/suggest/all`);
  }
}
