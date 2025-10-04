import { Routes } from '@angular/router';
import { RegisterComponent } from './Forms/register/register.component';
import { ComponentComponent } from './dashboard/sections/component/component.component';
import { LoginComponent } from './Forms/login/login.component';
import { EditProfileComponent } from './Forms/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: '', component: ComponentComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },

  { path: 'user/edit/profile', component: EditProfileComponent },
];
