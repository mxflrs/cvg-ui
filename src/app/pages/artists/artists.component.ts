import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsService } from 'src/app/services/cms.service';
import { Artists } from 'src/app/core/models/artists.interface';
import { forkJoin } from 'rxjs';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner.component';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {
  public artists: Artists[] = [];
  public artworks: Artworks[] = [];
  public isSearching: boolean = false;
  public filteredArtists: Artists[] = [];
  public isLoading: boolean = true;

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
        const rawArtists = artists;
        const rawArtworks = artworks;

        rawArtists.forEach(ats => {
          const firstArtwork = rawArtworks.filter(i => i.artist.name === ats.name);
          const artistPicture = ats.picture?.asset._ref;

          if (!artistPicture) {
            ats.picture = firstArtwork[0]?.image;
          }
          // const firstArtwork = rawArtworks.filter(i => i.artist.name === ats.name);
          // if (firstArtwork.length > 0) {
          //   ats.picture = firstArtwork[0].image;
          // }
        })

        this.artworks = rawArtworks;
        this.artists = rawArtists;
      }
    })
  }

  onSearchArtist(e: Event) {
    const inputText = (e.target as HTMLInputElement).value;
    inputText.length > 0 ? this.isSearching = true : this.isSearching = false;

    this.filteredArtists = this.artists.filter(x =>
      x.name?.toLowerCase().includes(inputText) ||
      x.surname?.toLowerCase().includes(inputText)
    );
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }
}
