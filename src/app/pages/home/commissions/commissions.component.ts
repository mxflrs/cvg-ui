import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { ContentWrapperComponent } from 'src/app/shared/components/content-wrapper.component';

@Component({
  selector: 'app-commissions',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './commissions.component.html',
  styleUrl: './commissions.component.scss'
})
export class CommissionsComponent {
  @Input() artworks: Artworks[] = [];
  public currentIndex = 0;

  constructor(private imageBuilder: ImageBuilderService) {}

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
}
