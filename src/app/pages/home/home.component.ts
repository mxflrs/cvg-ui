import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderComponent } from 'src/app/pages/home/main-slider/main-slider.component';
import { OriginalArtworksComponent } from './original-artworks/original-artworks.component';
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
    SearchModalComponent,
    ArtistSectionComponent,
    CommissionsComponent
],
  template: `

    <section class="grid grid-cols-2 gap-6 texture-3 px-[10%] h-screen relative overflow-hidden">

        <!-- 1 -->
        <div class="h-screen flex items-center w-full relative">
          <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="object-cover h-full rounded-sm py-6 w-full">
          <div class="absolute right-0 bottom-10 flex w-full">
            <div class="flex w-auto flex-col bg-cvg-400 mx-auto p-4 min-w-48 text-center texture-2 text-white">
              <p class="text-xs">Artists</p>
              <p class="font-bold">Title</p>
              <p class="text-xs">Price</p>
            </div>
          </div>
        </div>

        <!-- 2 -->
         <div class="flex h-screen flex-col">

           <div class="uppercase flex flex-col items-end h-1/2 justify-center">
             <h1>Carlos</h1>
             <h1 class="-my-6">V Garcia</h1>
             <h1 class="font-bold">Gallery</h1>
             <div class="flex gap-6 items-center">
               <button class="btn clear flex gap-2 justify-center items-center" (click)="openSearchModal()"><i class="ri-search-line ri-2 mr-auto"
                 ></i>Search Artworks</button>
               <button class="btn flex gap-2 justify-center items-center"><i class="ri-gallery-line ri-2"></i>Explore</button>
              </div>
            </div>

            <!-- 3 -->
            <div class="grid grid-cols-2 gap-6 h-1/2 pb-6">
              <div class="w-full h-full relative group">
                <img src="https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="w-full object-cover h-full opacity-60 group-hover:opacity-100">
                <button class="btn clear absolute right-4 bottom-4">Artists</button>
              </div>

              <div class="w-full h-full relative group">
                <img src="https://images.unsplash.com/photo-1579541513287-3f17a5d8d62c?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="w-full object-cover h-full opacity-60 group-hover:opacity-100">
                <button class="btn clear absolute right-4 bottom-4">Prints</button>
              </div>

            </div>
          </div>

      <app-search-modal [(showSearch)]="showSearch" [artworks]="artworks" />

    </section>

    <app-original-artworks  [artworks]="artworks" />
    <app-commissions [artworks]="artworks" />
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
