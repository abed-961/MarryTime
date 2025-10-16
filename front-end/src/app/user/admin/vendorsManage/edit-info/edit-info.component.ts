import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../../services/user/admin.service';
import { CommonModule } from '@angular/common';
import { VendorService } from '../../../../../services/user/vendor.service';
import { AlertService } from '../../../../../services/alert/alert.service';
import { stat } from 'fs';

@Component({
  selector: 'app-edit-info',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-info.component.html',
  styleUrl: './edit-info.component.css',
})
export class EditInfoComponent {
  user: any;
  vendorForm!: FormGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private adServ: AdminService,
    private fb: FormBuilder,
    private vendorService: VendorService,
    private alertService: AlertService
  ) {
    this.vendorForm = this.fb.group({
      company_name: [''],
      price_range: [''],
      location: [''],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vendorService.getVendorById(id).subscribe({
      next: (res: any) => {
        this.user = res;
        this.loading = false;
        if (res.user.vendor !== null) {
          Object.keys(this.user.vendor).forEach((key) => {
            this.vendorForm.patchValue({
              [key]: this.user.vendor[key] ? this.user.vendor[key] : '',
            });
          });
        }
        console.log(this.vendorForm.value);
      },
      error: (error: any) => {
        this.loading = false;
      },
    });
  }

  saveVendor() {
    if (!this.vendorForm.valid) return;
    console.log(this.vendorForm.value);
    this.adServ.editVendors(this.user.id, this.vendorForm.value).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.notification(res.description, 'success');
          this.ngOnInit();
        } else {
          this.notification(res.description, 'error');
        }
      },
      error: (err: any) => {
        this.notification('something Went Wrong ', 'error');
        this.handleErrors(err);
      },
    });
  }

  notification(message: string, status: any) {
    this.alertService.show(message, status);
  }

  handleErrors(err: any) {
    const errors = err.error.errors;
    Object.keys(errors).forEach((key) => {
      this.vendorForm.get(key)?.setErrors({ server: errors[key][0] });
    });
  }

  changePrice(event: Event) {
    const input = event.target as HTMLInputElement;
    this.vendorForm.patchValue({ price_range: input.value });
  }

  locationChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.vendorForm.patchValue({ location: input.value });
    console.log(this.vendorForm.value);
  }
}
