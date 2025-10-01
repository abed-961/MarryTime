import { Injectable } from '@angular/core';
import { api } from '../../../environments/api';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

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

  getUser() {
    return this.http.get(`${this.api}/api/user`, { withCredentials: true });
  }
}
