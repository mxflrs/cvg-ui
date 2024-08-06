import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../../shared/components/title.component';
import { ContentWrapperComponent } from '../../../shared/components/content-wrapper.component';
import { sampleImages } from 'src/assets/data/images';

@Component({
  selector: 'app-original-artworks',
  standalone: true,
  imports: [CommonModule, TitleComponent, ContentWrapperComponent],
  templateUrl: './original-artworks.component.html',
  styleUrl: './original-artworks.component.scss',
})
export class OriginalArtworksComponent {
  public imagesToDisplay = structuredClone(sampleImages);
  public currentIndex = 0;
  public isHovering = false;
  public isLiked = false;

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
}
