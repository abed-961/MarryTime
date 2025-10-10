import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../interfaces/appointment';
import { api } from '../../environments/api';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  api = api.url;

  private http = inject(HttpClient);
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.api}/api/appointments`, {
      withCredentials: true,
    });
  }

  createAppointment(data: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.api}/api/appointments`, data, {
      withCredentials: true,
    });
  }

  loadVendors(searchTerm: any) {
    return this.http.get<any[]>(
      `http://localhost:8000/api/vendors?search=${searchTerm}`,
      {
        withCredentials: true,
      }
    );
  }

  loadCategories(searchTerm: any) {
    return this.http.get<any[]>(
      `http://localhost:8000/api/categories?search=${searchTerm}`,
      {
        withCredentials: true,
      }
    );
  }

  refuseAppointment(id: number) {
    return this.http.delete(`${this.api}/api/appointment/${id}/delete`, {
      withCredentials: true,
    });
  }
}
