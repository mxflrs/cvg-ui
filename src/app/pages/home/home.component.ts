import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderComponent } from 'src/app/pages/home/main-slider/main-slider.component';
import { LimitedEditionComponent } from './limited-edition/limited-edition.component';
import { OriginalArtworksComponent } from './original-artworks/original-artworks.component';
import { DigitalArtComponent } from './digital-art/digital-art.component';
import { ExtrasComponent } from './extras/extras.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';

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
  ],
  template: `
    <div class="max-h-screen grid grid-cols-10 gap-6 bg-slate-100 relative mb-56">
      <section class="col-span-9 pt-20 max-h-full">
        <!-- TITLE -->
        <div class="uppercase flex flex-col items-end">
          <h1>Carlos</h1>
          <h1 class="-my-6">V Garcia</h1>
          <h1 class="font-bold">Gallery</h1>
        </div>

        <app-main-slider />

        <!-- SEARCH -->
        <div class="absolute bottom-8 left-6 flex gap-2">
          <button>
            <i class="ri-search-line ri-2 bg-cvg-200 p-2 mr-auto"></i>
          </button>
          <h4>Search Artworks / Artists</h4>
        </div>
      </section>
    </div>

    <app-original-artworks />
    <app-digital-art />
    <app-limited-edition />
    <app-extras />
    <app-merchandise />
  `,
})
export class HomeComponent {}
