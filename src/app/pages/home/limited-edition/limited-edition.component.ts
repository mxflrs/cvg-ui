import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { sampleImages } from 'src/assets/data/images';
import { images } from 'src/app/core/models/images.interface';
import { ImageEnlargerComponent } from 'src/app/shared/components/image-enlarger.component';

@Component({
  selector: 'app-limited-edition',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent, ImageEnlargerComponent],
  templateUrl: './limited-edition.component.html',
  styleUrl: './limited-edition.component.scss'
})
export class LimitedEditionComponent {
  public imagesToDisplay = structuredClone(sampleImages);
  public currentIndex = 0;
  public isHovering = false;
  public isLiked = false;
  public openModal = false;
  public selectedImage: images | null = null;

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

  onOpenModal(image: any) {
    this.openModal = true;
    document.body.style.overflow = 'hidden';
    this.selectedImage = image;
  }

}
