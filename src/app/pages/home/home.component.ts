import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderComponent } from 'src/app/pages/home/main-slider/main-slider.component';
import { OriginalArtworksComponent } from './original-artworks/original-artworks.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { CmsService } from 'src/app/services/cms.service';
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { ArtistSectionComponent } from "./artist-section/artist-section.component";
import { CommissionsComponent } from 'src/app/pages/home/commissions/commissions.component';

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

        <app-main-slider />

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

      <app-search-modal [(showSearch)]="showSearch" />
    </div>

    <app-original-artworks  [artworks]="artworks" />
    <app-commissions [artworks]="artworks" />
    <app-merchandise [artworks]="artworks" />
    <app-artist-section />
  `,
})
export class HomeComponent {
  public slug = '';
  public artist = 'Carlos V Garcia';
  public artworks: sanityImage[] = [];
  public showSearch = false;

  constructor(private cmsService: CmsService) {

  }

  ngOnInit() {
    this.cmsService.getArtworksByArtistName(this.artist).subscribe({
      next: (data) => {
        this.artworks = data;
        data.forEach(a => {
          a.about?.category?.forEach(c => console.log(c._ref))
        })
      }
    });

    this.cmsService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }

  openSearchModal() {
    this.showSearch = !this.showSearch;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0});
  }
}
