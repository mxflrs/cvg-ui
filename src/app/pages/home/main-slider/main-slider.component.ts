import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/services/home.service';
import { images } from 'src/app/core/models/images.interface';
import { sampleImages } from 'src/assets/data/images';
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ArrayHelper } from 'src/app/shared/helpers/array-helper';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent {
  @Input() artworks: Artworks[] = [];
  public artworksShow: Artworks[] = [];
  public imageOnDisplayIndex = 0;

  public imagesToDisplay = structuredClone(sampleImages);

  constructor(private imageBuilder: ImageBuilderService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artworks']) {
      if (this.artworks.length > 0) {
        this.artworksShow = ArrayHelper.getRandomItems(this.artworks, 6);
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
