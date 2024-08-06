import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { sampleImages } from 'src/assets/data/images';

@Component({
  selector: 'app-merchandise',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './merchandise.component.html',
  styleUrl: './merchandise.component.scss'
})
export class MerchandiseComponent {
  public imagesToDisplay = structuredClone(sampleImages);

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
}
