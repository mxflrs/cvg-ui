import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { sanityImage } from 'src/app/core/models/sanity-image.interface';

@Component({
  selector: 'app-digital-art',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './digital-art.component.html',
  styleUrl: './digital-art.component.scss'
})
export class DigitalArtComponent {
  @Input() artworks: sanityImage[] = [];
}
