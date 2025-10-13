import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PhotoService } from '../../../../services/photo.service';
import { api } from '../../../../environments/api';

@Component({
  selector: 'app-wedding-pictures',
  imports: [CommonModule],
  templateUrl: './wedding-pictures.component.html',
  styleUrl: './wedding-pictures.component.css',
})
export class WeddingPicturesComponent implements OnInit {
  nbPhotos = 6;
  photos: any;
  photo_url = api.photo_url;
  private photoService = inject(PhotoService);

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    console.log('on');
    this.photoService.getPhotos().subscribe({
      next: (res: any) => {
        this.photos = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  selectedPhoto: any = null;

  openPhoto(photo: any) {
    this.selectedPhoto = photo;
  }

  closePhoto(event: MouseEvent) {
    event.stopPropagation();
    this.selectedPhoto = null;
  }
}
