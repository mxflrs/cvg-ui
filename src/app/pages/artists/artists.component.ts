import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsService } from 'src/app/services/cms.service';
import { Artists } from 'src/app/core/models/artists.interface';
import { forkJoin } from 'rxjs';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {
  public artists: Artists[] = [];
  public artworks: Artworks[] = [];
  constructor(private cmsService: CmsService, private imageBuilder: ImageBuilderService,) {}

  ngOnInit() {
    this.loadArtistsAndArtworks();
  }

  loadArtistsAndArtworks() {
    forkJoin({
      artists: this.cmsService.getAllArtists(),
      artworks: this.cmsService.getAllArtworks()
    }).subscribe({
      next: ({artists, artworks}) => {
        this.artists = artists;
        this.artworks = artworks;

        this.artists.forEach(ats => {
          const firstArtwork = this.artworks.find(i => i.artist.name === ats.name);
          if (firstArtwork) {
            ats.picture = firstArtwork.image;
          }
        })
      }
    })
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

  onSearchArtist(e: Event) {

  }
}
