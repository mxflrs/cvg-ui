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
import { ArrayHelper } from 'src/app/shared/helpers/array-helper';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

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

    <section class="grid xl:grid-cols-2 gap-6 texture-3 lg:px-[10%] px-8 lg:h-screen h-full relative overflow-hidden" *ngIf="artworksShow.length > 0">

        <!-- 1 -->
        <div class="xl:h-screen h-96 flex items-center w-full relative">
          <img [src]="imageUrl(artworksShow[0].image.asset._ref) + '?q=50&fm=webp&w=1400'"
          alt="Main image" class="object-cover h-full rounded-sm pt-6 pb-0 lg:pb-6 w-full object-center" (load)="onImageLoad()" />
          <div class="absolute right-0 bottom-10 flex w-full">
            <div class="flex w-auto flex-col bg-cvg-400 mx-auto p-4 min-w-48 text-center texture-2 text-white">
              <p class="text-xs capitalize">{{artworksShow[0].artist.name}}</p>
              <p class="font-bold">{{artworksShow[0].title}}</p>
            </div>
          </div>
        </div>

        <!-- 2 -->
         <div class="flex lg:h-screen h-full flex-col">

           <div class="uppercase flex flex-col lg:items-end items-center lg:h-1/2 h-auto justify-center text-center">
             <h1 class="hidden lg:block">Carlos</h1>
             <h1 class="hidden lg:block -my-6">V Garcia</h1>
             <h1 class="hidden lg:block font-bold">Gallery</h1>

             <!-- MOBILE & TABLET -->
             <h2 class="lg:hidden block text-3xl">Carlos V Garcia</h2>
             <h3 class="lg:hidden block font-bold">Gallery</h3>

             <div class="flex lg:gap-6 gap-4 items-center xl:flex-row flex-col text-sm lg:text-base mt-4 pb-8">
               <button class="btn clear flex gap-2 justify-center items-center" (click)="openSearchModal()"><i class="ri-search-line ri-2 mr-auto"
                 ></i>Search Artworks</button>
               <a href="/artworks" class="btn flex gap-2 justify-center items-center capitalize"><i class="ri-gallery-line ri-2"></i>Explore</a>
              </div>
            </div>

            <!-- 3 -->
            <div class="xl:grid grid-cols-2 gap-6 h-1/2 pb-6 hidden">
              <a href="/artists" class="w-full h-full relative group" *ngIf="artworksShow[1].image.asset._ref">
                <img [src]="imageUrl(artworksShow[1].image.asset._ref) + '?q=75&fm=webp&w=800'" alt="" class="w-full object-cover h-full opacity-40 group-hover:opacity-100 group-hover:filter-none grayscale transition duration-300 ease-in-out">
                <button class="btn clear absolute right-4 bottom-4">Artists</button>
              </a>

              <a href="/prints" class="w-full h-full relative group" *ngIf="artworksShow[2].image.asset._ref">
                <img [src]="imageUrl(artworksShow[2].image.asset._ref) + '?q=75&fm=webp&w=800'" alt="" class="w-full object-cover h-full opacity-40 group-hover:opacity-100 group-hover:filter-none grayscale transition duration-300 ease-in-out">
                <button class="btn clear absolute right-4 bottom-4">Prints</button>
              </a>

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
  public filteredArtworks: Artworks[] = [];
  public artworksShow: Artworks[] = [];
  public isImageLoaded = false;

  constructor(private cmsService: CmsService, private storeArtworksService: StoreArtworksService, private imageBuilder: ImageBuilderService) {}

  ngOnInit() {
    this.loadArtworks();
    this.loadArtists();
  }

  onImageLoad() {
    this.isImageLoaded = true;
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

    this.cmsService.getAllArtworksHighRes().subscribe({
      next: (data) => {
        this.filteredArtworks = ArrayHelper.getRandomItems(data, 3);
        this.processArtworkData();
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

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

  processArtworkData() {
    this.artworksShow = this.storeArtworksService.filteredLikedArtworks(this.filteredArtworks);
  }

  openSearchModal() {
    this.showSearch = !this.showSearch;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0});
  }
}
