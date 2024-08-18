import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../../shared/components/title.component';
import { ContentWrapperComponent } from '../../../shared/components/content-wrapper.component';
import { sampleImages } from 'src/assets/data/images';
import { ImageEnlargerComponent } from "../../../shared/components/image-enlarger.component";
import { images } from 'src/app/core/models/images.interface';
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

@Component({
  selector: 'app-original-artworks',
  standalone: true,
  imports: [CommonModule, TitleComponent, ContentWrapperComponent, ImageEnlargerComponent],
  templateUrl: './original-artworks.component.html',
  styleUrl: './original-artworks.component.scss',
})
export class OriginalArtworksComponent {
  @Input() artworks: sanityImage[] = [];
  public artworksShow: sanityImage[] = []
  public imagesToDisplay = structuredClone(sampleImages);
  public currentIndex = 0;
  public isHovering = false;
  public isLiked = false;
  public openModal = false;
  public selectedImage: images | null = null;
  public selectedIndex = 0;

  constructor(private imageBuilder: ImageBuilderService) { }

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
    const next = this.imagesToDisplay.pop();
    if (next) {
      this.imagesToDisplay.unshift(next);
    }
  }

  onPrevImage() {
    const last = this.imagesToDisplay.shift();
    if (last) {
      this.imagesToDisplay.push(last);
    }
  }

  onSelectNextImage() {
    if (this.selectedIndex >= this.imagesToDisplay.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
    this.selectedImage = this.imagesToDisplay[this.selectedIndex];
  }

  onSelectPrevImage() {
    if (this.selectedIndex == 0) {
      this.selectedIndex = this.imagesToDisplay.length - 1;
    } else {
      this.selectedIndex--;
    }
    this.selectedImage = this.imagesToDisplay[this.selectedIndex];
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
