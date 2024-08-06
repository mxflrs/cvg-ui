import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderComponent } from 'src/app/pages/home/main-slider/main-slider.component';
import { LimitedEditionComponent } from './limited-edition/limited-edition.component';
import { OriginalArtworksComponent } from './original-artworks/original-artworks.component';
import { DigitalArtComponent } from './digital-art/digital-art.component';
import { ExtrasComponent } from './extras/extras.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { FurnitureAndAppliedArtsComponent } from './furniture-and-applied-arts/furniture-and-applied-arts.component';
import { SearchModalComponent } from './search-modal/search-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MainSliderComponent,
    LimitedEditionComponent,
    OriginalArtworksComponent,
    DigitalArtComponent,
    ExtrasComponent,
    MerchandiseComponent,
    FurnitureAndAppliedArtsComponent,
    SearchModalComponent,
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

    <app-original-artworks />
    <app-digital-art />
    <app-limited-edition />
    <app-furniture-and-applied-arts />
    <app-merchandise />
    <app-extras />
  `,
})
export class HomeComponent {
  public showSearch = false;

  openSearchModal() {
    this.showSearch = !this.showSearch;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0});
  }
}
