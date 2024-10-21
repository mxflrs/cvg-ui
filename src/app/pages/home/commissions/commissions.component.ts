import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { ContentWrapperComponent } from 'src/app/shared/components/content-wrapper.component';
import { ImageEnlargerComponent } from 'src/app/shared/components/image-enlarger.component';

@Component({
  selector: 'app-commissions',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent, ImageEnlargerComponent],
  templateUrl: './commissions.component.html',
  styleUrl: './commissions.component.scss'
})
export class CommissionsComponent {
  @Input() artworks: Artworks[] = [];
  public selectedImage: Artworks = {} as Artworks;
  public currentIndex = 0;
  public openModal = false;

  constructor(private imageBuilder: ImageBuilderService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artworks']) {
      this.artworks = this.artworks.slice(0, 16)
    }
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

  onNextImage() {
    const next = this.artworks.pop();
    if (next) {
      this.artworks.unshift(next);
    }
  }

  onPrevImage() {
    const last = this.artworks.shift();
    if (last) {
      this.artworks.push(last);
    }
  }

  onSelectNextImage() {
    if (this.currentIndex >= this.artworks.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.selectedImage = this.artworks[this.currentIndex];
  }

  onSelectPrevImage() {
    if (this.currentIndex == 0) {
      this.currentIndex = this.artworks.length - 1;
    } else {
      this.currentIndex--;
    }
    this.selectedImage = this.artworks[this.currentIndex];
  }

  onOpenModal(image: any, index: number) {
    if (index == 0) {
      this.openModal = true;
      document.body.style.overflow = 'hidden';
      this.selectedImage = image;
      this.currentIndex = index;
    }
  }
}
