import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestingAppointmentComponent } from './suggesting-appointment.component';

describe('SuggestingAppointmentComponent', () => {
  let component: SuggestingAppointmentComponent;
  let fixture: ComponentFixture<SuggestingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestingAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
