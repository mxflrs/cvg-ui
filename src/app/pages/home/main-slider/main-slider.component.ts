import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/services/home.service';
import { images } from 'src/app/core/models/images.interface';
import { sampleImages } from 'src/assets/data/images';
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { Artworks } from 'src/app/core/models/artworks.interface';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent {
  @Input() artworks: Artworks[] = [];
  @Input() artworksShow: Artworks[] = [];
  public imagesData: images[] = [];
  public imageOnDisplayIndex = 0;

  public imagesToDisplay = structuredClone(sampleImages);

  constructor(private imageBuilder: ImageBuilderService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artworks']) {
      if (this.artworks.length > 0) {
        this.artworksShow = this.artworks.slice(0, 6);
        console.table(this.artworksShow);
      }
    }
  }

  navigateToImage(index: number) {
    this.imageOnDisplayIndex = index;
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }
}
