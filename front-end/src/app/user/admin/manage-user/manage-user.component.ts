import { Component } from '@angular/core';
import { AdminService } from '../../../../services/user/admin.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../services/alert/alert.service';
import e from 'express';

@Component({
  selector: 'app-manage-user',
  imports: [CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent {
  users: any;
  loading = false;
  error = '';

  constructor(private ad: AdminService, private alertService: AlertService) {}

  ngOnInit() {
    this.fetchUsers('');
  }

  fetchUsers(event: Event | string) {
    let filter = null;
    if (event instanceof Event) {
      filter = event.target as HTMLSelectElement;
      filter = filter.value;
    } else {
      filter = event;
    }
    this.loading = true;
    this.error = '';
    this.ad.ManageUser(filter).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load users.';
        this.loading = false;
      },
    });
  }

  toggleRole(id: number) {
    this.ad.toggelUserRole(id).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.alertService.show(res.description);
          this.fetchUsers('');
        } else {
          this.alertService.show(res.description, 'error');
        }
      },
      error: (err: any) => {
        this.alertService.show(err.errors.err[0], 'error');
      },
    });
  }

  deleteUser(id: number) {
    this.ad.deleteUser(id).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.alertService.show(res.description);
          this.fetchUsers('');
        } else {
          this.alertService.show(res.description, 'error');
        }
      },
      error: (err: any) => {
        this.alertService.show(err.errors.err[0], 'error');
      },
    });
  }

  Restore(id: number) {
    this.ad.restoreUser(id).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.alertService.show(res.description);
          this.fetchUsers('');
        } else {
          this.alertService.show(res.description, 'error');
        }
      },
      error: (err: any) => {
        this.alertService.show(err.errors.err[0], 'error');
      },
    });
  }
}
