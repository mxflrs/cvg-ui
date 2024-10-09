import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from 'src/app/services/cms.service';
import { Artists } from 'src/app/core/models/artists.interface';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { FavoriteIconComponent } from "../../shared/components/favorite-icon.component";
import { StoreArtworksService } from 'src/app/services/store-artworks.service';
import { ImageEnlargerComponent } from 'src/app/shared/components/image-enlarger.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner.component';
import { ContactModalComponent } from 'src/app/shared/components/contact-modal.component';

@Component({
  selector: 'app-single-artists',
  standalone: true,
  imports: [CommonModule, FavoriteIconComponent, ImageEnlargerComponent, SpinnerComponent, ContactModalComponent],
  templateUrl: './single-artists.component.html',
  styleUrl: './single-artists.component.scss'
})
export class SingleArtistsComponent {
  public id  = '';
  public currentArtist = {} as Artists;
  public artworks: Artworks[] = [];
  public filteredArtworks: Artworks[] = [];
  public openModal = false;
  public selectedImage: Artworks = {} as Artworks;
  public selectedIndex = 0;
  public isLoading = true;

  public selectedFilter = 'recent';
  public isSearching = false;
  public currentIndex = -1;
  public showContactModal = false;
  public message = '';

  constructor(private route: ActivatedRoute, private cmsService: CmsService, private imageBuilder: ImageBuilderService, private storeArtworksService: StoreArtworksService){}

  ngOnInit() {
    this.loadIdFromParam();
    this.loadArtist();
  }

  loadIdFromParam() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.id = id;
    })
  }

  loadArtist() {
    this.cmsService.getArtistsById(this.id).subscribe({
      next: (data) => {
        this.currentArtist = data[0];
      },
      complete: () => {
        this.loadArtworks();
      }
    });
  }

  loadArtworks() {
    this.cmsService.getArtworksByArtistId(this.id).subscribe({
      next: (data) => {
        const rawData = structuredClone(data);
        rawData.forEach(x => {
          x.title = StringHelper.sanitizeString(x.title);
        })
        this.artworks = this.storeArtworksService.filteredLikedArtworks(rawData);
      },
      complete: () => this.isLoading = false
    })
  }

  onSelectNextImage() {
    if (this.selectedIndex >= this.artworks.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
    this.selectedImage = this.artworks[this.selectedIndex];
  }

  onSelectPrevImage() {
    if (this.selectedIndex == 0) {
      this.selectedIndex = this.artworks.length - 1;
    } else {
      this.selectedIndex--;
    }
    this.selectedImage = this.artworks[this.selectedIndex];
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

  processArtworkData() {
    this.artworks = this.storeArtworksService.filteredLikedArtworks(this.artworks);
  }

  onOpenModal(image: any, index: number) {
    this.openModal = true;
    document.body.style.overflow = 'hidden';
    this.selectedImage = image;
    this.selectedIndex = index;

    console.log(image);
  }

  onFilterChange(e: Event) {
    const event = e.target as HTMLSelectElement;
    this.selectedFilter = event.value;

    if (this.selectedFilter === 'recent') {
      this.artworks = [...this.artworks];
    } else {
      this.artworks = this.sortArtworks(this.artworks, this.selectedFilter);
    }
  }

  private sortArtworks(artworks: Artworks[], filter: string): Artworks[] {
    return artworks.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (filter === 'az') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
  }

  onSearchArtwork(e: Event) {
    const inputText = (e.target as HTMLInputElement).value;
    inputText.length > 0 ? this.isSearching = true : this.isSearching = false;

    this.filteredArtworks = this.artworks.filter(x =>
      x.title.toLowerCase().includes(inputText)
    );
  }

  onOpenContactModal(title:string) {
    if (title) {
      this.message = `Hi there, I’m interested in the following artwork: [ ${title} ]. Could you please provide more details on their availability and pricing?`
      this.showContactModal = true;
    }
  }

  reloadData() {
    this.processArtworkData();
  }
}
