import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { sampleImages } from 'src/assets/data/images';

@Component({
  selector: 'app-limited-edition',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './limited-edition.component.html',
  styleUrl: './limited-edition.component.scss'
})
export class LimitedEditionComponent {
  public imagesToDisplay = sampleImages;
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
}
