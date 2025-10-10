import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VendorTask, Task } from '../../interfaces/user_full_details_interface';
import { api } from '../../environments/api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private http = inject(HttpClient);
  api = api.url;

  loadTasks(): Observable<VendorTask[]> {
    return this.http.get<VendorTask[]>(`${this.api}/api/vendor-tasks`, {
      withCredentials: true,
    });
  }

  addTask(newTask: any, vendor_id: number) {
    return this.http.post(
      `${this.api}/api/${vendor_id}/vendor-tasks`,
      newTask,
      {
        withCredentials: true,
      }
    );
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.api}/api/${id}/vendor-tasks/`, {
      withCredentials: true,
    });
  }

  markAsCompleted(task: VendorTask) {
    return this.http.put(
      `${this.api}/api/vendor-tasks/${task.id}`,
      {
        ...task,
        status: 'completed',
      },
      { withCredentials: true }
    );
  }

  getVendorId() {
    return this.http.get(`${this.api}/api/getVendorId`, {
      withCredentials: true,
    });
  }

  filter(filter: string): Observable<VendorTask[]> {
    return this.http.get<VendorTask[]>(
      `${this.api}/api/vendor/filter?filter=${filter}`,
      {
        withCredentials: true,
      }
    );
  }

  updateTasksStatus(
    task: number,
    status: 'pending' | 'in_progress' | 'completed'
  ) {
    return this.http.put(
      `${this.api}/api/vendor-tasks/${task}`,
      {
        status,
      },
      { withCredentials: true }
    );
  }

  getVendorById(id : number){
    return this.http.get(`${this.api}/api/user/${id}/getVendor` , {withCredentials : true})
  }
}
