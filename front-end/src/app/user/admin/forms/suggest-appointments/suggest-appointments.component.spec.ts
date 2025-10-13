import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestAppointmentsComponent } from './suggest-appointments.component';

describe('SuggestAppointmentsComponent', () => {
  let component: SuggestAppointmentsComponent;
  let fixture: ComponentFixture<SuggestAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
