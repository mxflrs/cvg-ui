import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sampleImages } from 'src/assets/data/images';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ArrayHelper } from 'src/app/shared/helpers/array-helper';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';
import { ArtworkSimple } from 'src/app/core/models/artwork-simple.interface';
import { FavoriteIconComponent } from "../../../shared/components/favorite-icon.component";

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CommonModule, FavoriteIconComponent],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent {
  @Input() artworks: Artworks[] = [];
  public artworksShow: Artworks[] = [];
  public imageOnDisplayIndex = 0;
  public isLiked = false;
  public imagesToDisplay = structuredClone(sampleImages);
  public likedArtworks: ArtworkSimple[] = [];

  constructor(private imageBuilder: ImageBuilderService, private storeArtworksService: StoreArtworksService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artworks']) {
      if (this.artworks.length > 0) {
        this.artworksShow = ArrayHelper.getRandomItems(this.artworks, 6);
        this.fetchLikedArtworks();
      }
    }
  }

  navigateToImage(index: number) {
    this.imageOnDisplayIndex = index;
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

  onSelectNextImage() {
    if (this.imageOnDisplayIndex >= this.artworksShow.length - 1) {
      this.imageOnDisplayIndex = 0;
    } else {
      this.imageOnDisplayIndex++;
    }
  }

  onSelectPrevImage() {
    if (this.imageOnDisplayIndex == 0) {
      this.imageOnDisplayIndex = this.artworksShow.length - 1;
    } else {
      this.imageOnDisplayIndex--;
    }
  }

  fetchLikedArtworks() {
    const likedIds = this.storeArtworksService.getArtworks().map(x => x.id);
    this.artworksShow.forEach(art => {
      art.isLiked = likedIds.includes(art._id);
    });
  }

  reloadData() {
    this.fetchLikedArtworks();
  }
}
