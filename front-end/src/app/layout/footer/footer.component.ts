import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserFullDetails } from '../../../interfaces/user_full_details_interface';
import { identity } from '../../../environments/ownerInfo';
import { route } from '../../../environments/routes';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  route = route
  ownerInfo = identity;
  isIn!: boolean;
  @Input() user!: UserFullDetails;
  @Input() currentUrl!: string;
  @Input() style = {};

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    const urls = ['/notifications'];
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isIn = urls.includes(event.url);
      }
      cdr.detectChanges();
    });
  }
}
