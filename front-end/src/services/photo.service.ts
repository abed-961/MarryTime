import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../environments/api';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private http = inject(HttpClient);
  api = api.url;
  getPhotos() {
    return this.http.get(`${this.api}/api/getPhotos`);
  }
}
