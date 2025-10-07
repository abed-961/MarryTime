import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAppointmentsComponent } from './vendor-appointments.component';

describe('VendorAppointmentsComponent', () => {
  let component: VendorAppointmentsComponent;
  let fixture: ComponentFixture<VendorAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
