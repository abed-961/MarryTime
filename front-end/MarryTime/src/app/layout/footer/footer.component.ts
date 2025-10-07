import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';

import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserFullDetails } from '../../../interfaces/user_full_details_interface';
import { identity } from '../../../environments/ownerInfo';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  style: any = {};
  @Input() user!: UserFullDetails;
  @Input() currentUrl!: string;

  ownerInfo = identity;

  private cdr = inject(ChangeDetectorRef);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      const urls = ['/user/login', 'user/vendor/Tasks'];
      if (event instanceof NavigationEnd) {
        if (urls.includes(event.url)) {
          this.style = {
            position: 'fixed',
            bottom: '0',
            left: '0',
            zIndex: 1000,
            width: '100%',
          };
          this.cdr.detectChanges();
        } else {
          this.style = {}; // reset style for other routes
        }
      }
    });
  }
}
