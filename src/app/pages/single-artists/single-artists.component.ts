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

@Component({
  selector: 'app-single-artists',
  standalone: true,
  imports: [CommonModule, FavoriteIconComponent, ImageEnlargerComponent],
  templateUrl: './single-artists.component.html',
  styleUrl: './single-artists.component.scss'
})
export class SingleArtistsComponent {
  public id  = '';
  public currentArtist = {} as Artists;
  public artworks: Artworks[] = [];
  public openModal = false;
  public selectedImage: Artworks = {} as Artworks;
  public selectedIndex = 0;

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
      }
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
  }

  reloadData() {
    this.processArtworkData();
  }
}
