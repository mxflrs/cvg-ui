import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderComponent } from './components/home/main-slider/main-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MainSliderComponent],
  template: `
    <div class="h-full min-h-screen grid grid-cols-10">
      <section
        class="flex flex-col items-end col-span-9 pt-20 relative"
      >
        <!-- TITLE -->
        <div class="uppercase flex flex-col justify-end items-end">
          <h1>Carlos</h1>
          <h1 class="-my-6">V Garcia</h1>
          <h1 class="font-bold">Gallery</h1>
        </div>

        <!-- MAIN SLIDER -->
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
  `,
})
export class HomeComponent {}
