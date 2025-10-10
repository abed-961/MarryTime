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
export class UserServicesService {
  api = api.url;
  constructor(private http: HttpClient) {}

  register(userInfo: FormGroup) {
    return this.http.post(`${this.api}/api/user/register`, userInfo.value, {
      withCredentials: true,
    });
  }

  login(userInfo: FormGroup) {
    return this.http.post(`${this.api}/api/user/login`, userInfo.value, {
      withCredentials: true,
    });
  }

  getUser(): Observable<UserFullDetails> {
    return this.http.get<UserFullDetails>(`${this.api}/api/user`, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.get(`${this.api}/api/user/logout`, {
      withCredentials: true,
    });
  }

  getUserDashboard(): Observable<UserFullDetails> {
    return this.http.get<UserFullDetails>(`${this.api}/api/user/dashboard`, {
      withCredentials: true,
    });
  }

  updateUser(userData: any) {
    return this.http.post(`${this.api}/api/user/edit/data`, userData, {
      withCredentials: true,
    });
  }

  getVendors(id : number ): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.api}/api/user/${id}/vendors`, {
      withCredentials: true,
    });
  }
}
