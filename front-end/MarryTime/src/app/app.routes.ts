import { Routes } from '@angular/router';
import { RegisterComponent } from './Forms/register/register.component';
import { ComponentComponent } from './dashboard/sections/component/component.component';
import { LoginComponent } from './Forms/login/login.component';
import { EditProfileComponent } from './Forms/edit-profile/edit-profile.component';
import { VendorTaskComponent } from './user/vendor-task/vendor-task.component';
import { ClientAppointmentsComponent } from './user/appointment/client-appointments/client-appointments.component';
import { VendorAppointmentsComponent } from './user/appointment/vendor-appointments/vendor-appointments.component';
import { NotificationsComponent } from './user/notifications/notifications.component';

export const routes: Routes = [
  { path: '', component: ComponentComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/vendor/Tasks', component: VendorTaskComponent },
  { path: 'user/edit/profile', component: EditProfileComponent },
  { path: 'client/appointments', component: ClientAppointmentsComponent },
  { path: 'vendor/appointments', component: VendorAppointmentsComponent },
  { path: 'notifications', component: NotificationsComponent },
];
