import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderComponent } from 'src/app/pages/home/main-slider/main-slider.component';
import { OriginalArtworksComponent } from './original-artworks/original-artworks.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { CmsService } from 'src/app/services/cms.service';
import { ArtistSectionComponent } from "./artist-section/artist-section.component";
import { CommissionsComponent } from 'src/app/pages/home/commissions/commissions.component';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { Artists } from 'src/app/core/models/artists.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MainSliderComponent,
    OriginalArtworksComponent,
    MerchandiseComponent,
    SearchModalComponent,
    ArtistSectionComponent,
    CommissionsComponent
],
  template: `
    <div class="max-h-screen grid grid-cols-10 gap-6 bg-cvg-50 relative mb-56">
      <section class="col-span-9 pt-20 max-h-full">
        <!-- TITLE -->
        <div class="uppercase flex flex-col items-end">
          <h1>Carlos</h1>
          <h1 class="-my-6">V Garcia</h1>
          <h1 class="font-bold">Gallery</h1>
        </div>

        <app-main-slider [artworks]="artworks"/>

        <!-- SEARCH -->
        <button
          class="absolute bottom-8 left-6 flex gap-2 items-center group"
          (click)="openSearchModal()"
        >
          <i
            class="ri-search-line ri-2 bg-cvg-100 group-hover:bg-cvg-200 p-2 mr-auto"
          ></i>
          <h4>Search Artworks / Artists</h4>
        </button>
      </section>

      <app-search-modal [(showSearch)]="showSearch" [artworks]="artworks" />
    </div>

    <app-original-artworks  [artworks]="artworks" />
    <app-commissions [artworks]="artworks" />
    <!-- <app-merchandise [artworks]="artworks" /> -->
    <app-artist-section [artists]="artists" />
  `,
})
export class HomeComponent {
  public slug = '';
  public artist = 'Carlos V Garcia';
  public artworks: Artworks[] = [];
  public artists: Artists[] = [];
  public showSearch = false;

  constructor(private cmsService: CmsService) {}

  ngOnInit() {
    this.loadArtworks();
    this.loadArtists();
  }

  loadArtworks() {
    this.cmsService.getAllArtworks().subscribe({
      next: (data) => {
        const dataCopy = structuredClone(data);
        dataCopy.forEach(a => {
          a.title = StringHelper.sanitizeString(a.title);
        })
        this.artworks = dataCopy;
      }
    })
  }

  loadArtists() {
    this.cmsService.getAllArtists().subscribe({
      next: (data) => {
        this.artists = data;
      }
    })
  }

  openSearchModal() {
    this.showSearch = !this.showSearch;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0});
  }
}
