import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

@Component({
  selector: 'app-furniture-and-applied-arts',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './furniture-and-applied-arts.component.html',
  styleUrl: './furniture-and-applied-arts.component.scss'
})
export class FurnitureAndAppliedArtsComponent {
  @Input() artworks: sanityImage[] = [];
  @Input() artworksShow: sanityImage[] = [];

  constructor(private imageBuilder: ImageBuilderService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artworks']) {
      this.artworksShow = this.artworks.slice(0, 4);
    }
  }

}
