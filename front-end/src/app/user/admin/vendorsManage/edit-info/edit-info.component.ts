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
export class EditInfoComponent implements AfterViewInit {
  vendor: any;
  vendorForm!: FormGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private adServ: AdminService,
    private fb: FormBuilder,
    private vendorService: VendorService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      company_name: [''],
      price_range: [''],
      location: [''],
    });
  }

  ngAfterViewInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vendorService.getVendorById(id).subscribe({
      next: (res: any) => {
        this.vendor = res;
        this.loading = false;
        Object.keys(this.vendor).forEach((key) => {
          console.log(key, this.vendor[key]);
          this.vendorForm.patchValue({ [key]: this.vendor[key] });
        });
      },
      error: (error: any) => {
        this.loading = false;
      },
    });
  }

  saveVendor() {
    if (!this.vendorForm.valid) return;

    this.adServ.editVendors(this.vendor.id , this.vendorForm.value).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.notification(res.description, 'success');
          this.ngAfterViewInit();
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
    console.log(input.value);
    this.vendorForm.patchValue({ price_range: input.value });
  }
}
