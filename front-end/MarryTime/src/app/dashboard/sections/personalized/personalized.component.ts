import { Component } from '@angular/core';
import { identity } from '../../../../environments/ownerInfo';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-personalized',
  imports: [FormsModule],
  templateUrl: './personalized.component.html',
  styleUrl: './personalized.component.css',
})
export class PersonalizedComponent {
  ownerInfo = identity;

  sendEmail(form: NgForm) {
    if (!form.valid) return;

    const subject = encodeURIComponent(form.value.subject);
    const body = encodeURIComponent(form.value.body);


    const mailtoLink = `mailto:${this.ownerInfo.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }
}
