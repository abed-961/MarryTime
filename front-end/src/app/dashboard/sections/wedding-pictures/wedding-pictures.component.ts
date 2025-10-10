import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wedding-pictures',
  imports: [CommonModule],
  templateUrl: './wedding-pictures.component.html',
  styleUrl: './wedding-pictures.component.css',
})
export class WeddingPicturesComponent implements OnInit {
  nbPhotos = 6;
  photos: any;

  ngOnInit() {
    let temp = [];
    for (let i = 1; i <= this.nbPhotos; i++) {
      temp.push(i);
    }

    this.photos = temp.map((element) => ({
      url: `assets/images/download (${element}).jpeg`,
      caption: 'our Services work',
    }));
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
