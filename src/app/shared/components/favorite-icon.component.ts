import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtworkSimple } from 'src/app/core/models/artwork-simple.interface';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';

@Component({
  selector: 'app-favorite-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
        <i
          class="absolute z-40 px-2 py-1 rounded-sm bg-cvg-75 hover:bg-cvg-100 left-2 top-2 hover:scale-105 active:scale-90 cursor-pointer active:bg-cvg-accent2"
          [ngClass]="isLiked == true ? 'ri-heart-3-fill' : 'ri-heart-3-line'"
          (click)="addArtwork()"
        ></i>
  `
})

export class FavoriteIconComponent {
  @Input() isLiked?: boolean = false; //artworksShow[imageOnDisplayIndex].isLiked
  @Input() artworkInfo?: ArtworkSimple = {} as ArtworkSimple;
  @Output() refreshData = new EventEmitter<boolean>();

  constructor(private storeArtworksService: StoreArtworksService) { }


  addArtwork() {
    if (this.artworkInfo) {
      this.storeArtworksService.storeArtwork(this.artworkInfo); //artworksShow[imageOnDisplayIndex]._id, artworksShow[imageOnDisplayIndex].title
    }

    this.refreshData.emit(true);
    console.log('This works indeed!')
  }

}
