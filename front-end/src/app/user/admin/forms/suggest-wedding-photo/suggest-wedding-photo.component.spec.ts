import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestWeddingPhotoComponent } from './suggest-wedding-photo.component';

describe('SuggestWeddingPhotoComponent', () => {
  let component: SuggestWeddingPhotoComponent;
  let fixture: ComponentFixture<SuggestWeddingPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestWeddingPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestWeddingPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
