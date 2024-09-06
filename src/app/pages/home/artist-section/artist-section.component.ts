import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from 'src/app/shared/components/content-wrapper.component';
import { Artists } from 'src/app/core/models/artists.interface';

@Component({
  selector: 'app-artist-section',
  standalone: true,
  imports: [CommonModule,
    ContentWrapperComponent
  ],
  templateUrl: './artist-section.component.html',
  styleUrl: './artist-section.component.scss'
})
export class ArtistSectionComponent {
  @Input() artists: Artists[] = [];

}
