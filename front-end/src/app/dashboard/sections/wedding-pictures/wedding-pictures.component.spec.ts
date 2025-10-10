import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingPicturesComponent } from './wedding-pictures.component';

describe('WeddingPicturesComponent', () => {
  let component: WeddingPicturesComponent;
  let fixture: ComponentFixture<WeddingPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeddingPicturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
