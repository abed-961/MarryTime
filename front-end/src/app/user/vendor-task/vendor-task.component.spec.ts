import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTaskComponent } from './vendor-task.component';

describe('VendorTaskComponent', () => {
  let component: VendorTaskComponent;
  let fixture: ComponentFixture<VendorTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
