import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../../shared/components/title.component';
import { ContentWrapperComponent } from '../../../shared/components/content-wrapper.component';
import { sampleImages } from 'src/assets/data/images';
import { ImageEnlargerComponent } from "../../../shared/components/image-enlarger.component";
import { images } from 'src/app/core/models/images.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ArrayHelper } from 'src/app/shared/helpers/array-helper';
import { FavoriteIconComponent } from "../../../shared/components/favorite-icon.component";

@Component({
  selector: 'app-original-artworks',
  standalone: true,
  imports: [CommonModule, TitleComponent, ContentWrapperComponent, ImageEnlargerComponent, FavoriteIconComponent],
  templateUrl: './original-artworks.component.html',
  styleUrl: './original-artworks.component.scss',
})
export class OriginalArtworksComponent {
  @Input() artworks: Artworks[] = [];
  public imagesToShow: Artworks[] = [];
  public currentIndex = 0;
  public isHovering = false;
  public isLiked = false;
  public openModal = false;
  public selectedImage: Artworks = {} as Artworks;
  public selectedIndex = 0;

  constructor(private imageBuilder: ImageBuilderService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artworks'] ){
      this.imagesToShow = ArrayHelper.getRandomItems(this.artworks, 8);
    }
  }

  onHoverItem(index: number) {
    this.isHovering = true;
    this.currentIndex = index;
  }

  onResetIndex() {
    setTimeout(() => {
      this.currentIndex = 0;
    }, 1500);
  }

  onNextImage() {
    const next = this.imagesToShow.pop();
    if (next) {
      this.imagesToShow.unshift(next);
    }
  }

  onPrevImage() {
    const last = this.imagesToShow.shift();
    if (last) {
      this.imagesToShow.push(last);
    }
  }

  onSelectNextImage() {
    if (this.selectedIndex >= this.imagesToShow.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
    this.selectedImage = this.imagesToShow[this.selectedIndex];
  }

  onSelectPrevImage() {
    if (this.selectedIndex == 0) {
      this.selectedIndex = this.imagesToShow.length - 1;
    } else {
      this.selectedIndex--;
    }
    this.selectedImage = this.imagesToShow[this.selectedIndex];
  }

  onOpenModal(image: any, index: number) {
    this.openModal = true;
    document.body.style.overflow = 'hidden';
    this.selectedImage = image;
    this.selectedIndex = index;
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }
}
