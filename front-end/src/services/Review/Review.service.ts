import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { api } from '../../environments/api';
import { Review } from '../../interfaces/review';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  api = api.url;

  getLatest(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api}/api/feedbacks/latest`, {
      withCredentials: true,
    });
  }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api}/api/feedbacks`, {
      withCredentials: true,
    });
  }

  insertReview(id: number, data: any) {
    return this.http.post(`${this.api}/api/user/${id}/feedback`, data, {
      withCredentials: true,
    });
  }
}
