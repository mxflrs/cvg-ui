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

  onOpenModal(image: images) {
    this.openModal = true;
    document.body.style.overflow = 'hidden';
    this.selectedImage = image;
  }
}
