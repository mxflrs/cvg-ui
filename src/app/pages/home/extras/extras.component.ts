import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { CardsComponent } from "./cards/cards.component";
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

@Component({
  selector: 'app-extras',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent, CardsComponent],
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.scss'
})
export class ExtrasComponent {
  @Input() artworks: sanityImage[] = [];
  @Input() artworksShow: sanityImage[] = [];

  constructor(private imageBuilder: ImageBuilderService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artworks']) {
      this.artworksShow = this.artworks.slice(0, 4);
    }
  }

}
