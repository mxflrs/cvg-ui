import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { sampleImages } from 'src/assets/data/images';
import { ImagePreviewModalComponent } from "../../../shared/components/image-preview-modal.component";
import { images } from 'src/app/core/models/images.interface';

@Component({
  selector: 'app-merchandise',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent, ImagePreviewModalComponent],
  templateUrl: './merchandise.component.html',
  styleUrl: './merchandise.component.scss'
})
export class MerchandiseComponent {
  public imagesToDisplay = structuredClone(sampleImages);
  public openModal = false;
  public selectedImage: images | null = null;
  public selectedIndex: number = 0;

  onNextImage() {
    const last = this.imagesToDisplay.pop();
    if (last) {
      this.imagesToDisplay.unshift(last);
    }
  }

  onPrevImage() {
    const next = this.imagesToDisplay.shift();
    if (next) {
      this.imagesToDisplay.push(next);
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


  onOpenModal(image: images, index: number) {
    this.openModal = true;
    document.body.style.overflow = 'hidden';
    this.selectedImage = image;
    this.selectedIndex = index;
  }
}
