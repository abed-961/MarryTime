import { Component } from '@angular/core';
import { UserProfileViewComponent } from "../user-profile-view/user-profile-view.component";

@Component({
  selector: 'app-component',
  imports: [UserProfileViewComponent],
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class ComponentComponent {

}
