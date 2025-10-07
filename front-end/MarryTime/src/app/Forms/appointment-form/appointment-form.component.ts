import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent {
  appointmentForm: FormGroup;

  vendors: any[] = [];
  filteredVendors: any[] = [];
  showVendorDropdown = false;

  categories: any[] = [];
  filteredCategories: any[] = [];
  showCategoryDropdown = false;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      vendor_id: ['', Validators.required],
      category_id: ['', Validators.required],
      appointment_date: ['', Validators.required],
      location: ['', Validators.required],
      guests: [0, [Validators.required, Validators.min(1)]],
      tables: [0, [Validators.required, Validators.min(1)]],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadVendors('');
    this.loadCategories('');
  }

  // Load vendors from backend
  loadVendors(loadTerm: any) {
    this.appointmentService.loadVendors(loadTerm).subscribe((data) => {
      this.vendors = data;
      this.filteredVendors = data;
    });
  }

  // Load categories from backend
  loadCategories(loadTerm: any) {
    this.appointmentService.loadCategories(loadTerm).subscribe((data) => {
      this.categories = data;
      this.filteredCategories = data;
    });
  }

  // Filter vendors as user types
  filterVendors(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredVendors = this.vendors.filter((v) =>
      v.name.toLowerCase().includes(filterValue)
    );
  }

  selectVendor(vendor: any) {
    this.appointmentForm.patchValue({ vendor_id: vendor.id });
    this.showVendorDropdown = false;
  }

  getVendorName() {
    const vendor = this.vendors.find(
      (v) => v.id === this.appointmentForm.value.vendor_id
    );
    return vendor ? vendor.name : '';
  }

  // Filter categories as user types
  filterCategories(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredCategories = this.categories.filter((c) =>
      c.name.toLowerCase().includes(filterValue)
    );
  }

  selectCategory(category: any) {
    this.appointmentForm.patchValue({ category_id: category.id });
    this.showCategoryDropdown = false;
  }

  getCategoryName() {
    const category = this.categories.find(
      (c) => c.id === this.appointmentForm.value.category_id
    );
    return category ? category.name : '';
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.appointmentService
        .createAppointment(this.appointmentForm.value)
        .subscribe(() => {
          this.appointmentForm.reset();
          this.showVendorDropdown = false;
          this.showCategoryDropdown = false;
          // emit event if needed
        });
    }
  }
}
