import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "../../../shared/components/title.component";
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";
import { sampleImages } from 'src/assets/data/images';

@Component({
  selector: 'app-original-artworks',
  standalone: true,
  imports: [CommonModule, TitleComponent, ContentWrapperComponent],
  templateUrl: './original-artworks.component.html',
  styleUrl: './original-artworks.component.scss'
})
export class OriginalArtworksComponent {
  public imagesToDisplay = sampleImages;
  public currentIndex = 0;

}
