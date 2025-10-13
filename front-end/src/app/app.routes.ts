import { Routes } from '@angular/router';
import { RegisterComponent } from './Forms/register/register.component';
import { ComponentComponent } from './dashboard/sections/component/component.component';
import { LoginComponent } from './Forms/login/login.component';
import { EditProfileComponent } from './Forms/edit-profile/edit-profile.component';
import { VendorTaskComponent } from './user/vendor-task/vendor-task.component';
import { ClientAppointmentsComponent } from './user/appointment/client-appointments/client-appointments.component';
import { VendorAppointmentsComponent } from './user/appointment/vendor-appointments/vendor-appointments.component';
import { NotificationsComponent } from './user/notifications/notifications.component';
import { VendorPageComponent } from './user/vendor/vendor-page/vendor-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReviewComponent } from './user/vendor/review/review.component';
import { InsertComponent } from './user/vendor/review/insert/insert.component';
import { route } from '../environments/routes';
import { AdminPageComponent } from './user/admin/admin-page/admin-page.component';
import { SuggestAppointmentsComponent } from './user/admin/forms/suggest-appointments/suggest-appointments.component';
export const routes: Routes = [
  { path: route.home, component: ComponentComponent },
  { path: route.register, component: RegisterComponent },
  { path: route.login, component: LoginComponent },
  { path: route.vendorTasks, component: VendorTaskComponent },
  { path: route.editProfile, component: EditProfileComponent },
  { path: route.client_appointments, component: ClientAppointmentsComponent },
  { path: route.vendor_appointments, component: VendorAppointmentsComponent },
  { path: route.notification, component: NotificationsComponent },
  { path: route.appointment_vendors, component: VendorPageComponent },
  { path: route.feedbacks, component: ReviewComponent },
  { path: 'appointment/:id/show', component: VendorPageComponent },

  { path: 'vendor/:id/review', component: InsertComponent },
  //admin section
  { path: route.admin, component: AdminPageComponent },
  { path: route.suggest_appointment, component: SuggestAppointmentsComponent },

  //404 not found page
  { path: '**', component: NotFoundComponent },
];
