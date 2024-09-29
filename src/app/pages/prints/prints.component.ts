import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { CmsService } from 'src/app/services/cms.service';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';
import { ContactModalComponent } from 'src/app/shared/components/contact-modal.component';
import { FavoriteIconComponent } from 'src/app/shared/components/favorite-icon.component';
import { ImageEnlargerComponent } from 'src/app/shared/components/image-enlarger.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner.component';
import { StringHelper } from 'src/app/shared/helpers/string-helper';

@Component({
  selector: 'app-prints',
  standalone: true,
  imports: [ImageEnlargerComponent, SpinnerComponent, FavoriteIconComponent, CommonModule, ContactModalComponent],
  templateUrl: './prints.component.html',
  styleUrl: './prints.component.scss'
})
export class PrintsComponent {
  public artworks: Artworks[] = [];
  public filteredArtworks: Artworks[] = [];
  public originalArtworks: Artworks[] = [];
  public openModal: boolean = false;
  public selectedImage: Artworks = {} as Artworks;
  public selectedIndex = 0;
  public selectedFilter = 'recent';
  public isSearching = false;
  public currentIndex = -1;
  public showContactModal = false;
  public message = '';


  constructor(
    private cmsService: CmsService,
    private imageBuilder: ImageBuilderService,
    private storeDataService: StoreArtworksService
  ) { }

  ngOnInit() {
    this.loadArtworks();
  }

  loadArtworks() {
    this.cmsService.getAllArtworks().subscribe({
      next: (data) => {
        const dataCopy = structuredClone(data.filter(a => !a.info.display));
        dataCopy.forEach(a => {
          a.title = StringHelper.sanitizeString(a.title);
        });
        const dataBeforeSort = this.storeDataService.filteredLikedArtworks(dataCopy);
        this.artworks = dataBeforeSort;
        this.originalArtworks = [...this.artworks];
      }
    });
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

  onFilterChange(e: Event) {
    const event = e.target as HTMLSelectElement;
    this.selectedFilter = event.value;

    if (this.selectedFilter === 'recent') {
      this.artworks = [...this.originalArtworks];
    } else {
      this.artworks = this.sortArtworks(this.artworks, this.selectedFilter);
    }
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

  onOpenModal(image: any, index: number) {
    this.openModal = true;
    document.body.style.overflow = 'hidden';
    this.selectedImage = image;
    this.selectedIndex = index;
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

  onSearchArtwork(e: Event) {
    const inputText = (e.target as HTMLInputElement).value;
    inputText.length > 0 ? this.isSearching = true : this.isSearching = false;

    this.filteredArtworks = this.artworks.filter(x =>
      x.title.toLowerCase().includes(inputText) ||
      x.artist.name.toLowerCase().includes(inputText)
    );
  }

  onHoverItem(e: number) {
    this.currentIndex = e;
  }

  onOpenContactModal(title?: string) {
    if (title) {
      this.message = `Hi there, I’m interested in the following artwork: - - ${title} - -. Could you please provide more details on their availability and pricing?`
      this.showContactModal = true;
    }
  }

  reloadData() {
    this.artworks = this.storeDataService.filteredLikedArtworks(this.artworks);
  }
}
