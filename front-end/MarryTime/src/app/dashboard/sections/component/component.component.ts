import { Component } from '@angular/core';
import { UserProfileViewComponent } from "../user-profile-view/user-profile-view.component";
import { WeddingPicturesComponent } from "../wedding-pictures/wedding-pictures.component";

@Component({
  selector: 'app-component',
  imports: [UserProfileViewComponent, WeddingPicturesComponent],
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class ComponentComponent {

}
