import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsService } from 'src/app/services/cms.service';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { ImageEnlargerComponent } from 'src/app/shared/components/image-enlarger.component';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { FavoriteIconComponent } from 'src/app/shared/components/favorite-icon.component';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';

@Component({
  selector: 'app-artworks',
  standalone: true,
  imports: [CommonModule, ImageEnlargerComponent, FavoriteIconComponent],
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.scss'
})
export class ArtworksComponent {
  public artworks: Artworks[] = [];
  public openModal: boolean = false;
  public selectedImage: Artworks = {} as Artworks;
  public selectedIndex = 0;

  constructor(private cmsService: CmsService, private imageBuilder: ImageBuilderService, private storeDataService: StoreArtworksService) {}

  ngOnInit() {
    this.loadArtworks();
  }

  loadArtworks() {
    this.cmsService.getAllArtworks().subscribe({
      next: (data) => {
        const dataCopy = structuredClone(data);
        dataCopy.forEach(a => {
          a.title = StringHelper.sanitizeString(a.title);
        })

        this.artworks = this.storeDataService.filteredLikedArtworks(dataCopy);
      }
    })
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

  reloadData() {
    this.artworks = this.storeDataService.filteredLikedArtworks(this.artworks);
  }
}
