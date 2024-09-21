import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';
import { CmsService } from 'src/app/services/cms.service';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  public ids: string[] = [];
  public likedArtworks: Artworks[] = [];

  constructor(private storeService: StoreArtworksService, private cmsService: CmsService, private imageBuilder: ImageBuilderService) {}

  ngOnInit() {
    this.loadArtworksFromLocalHost();
    this.loadAllArtworks();
  }

  loadArtworksFromLocalHost() {
    const x = this.storeService.getArtworks();
    const y = x.flatMap(i => i.id);
    this.ids = y;
  }

  loadAllArtworks() {
    this.cmsService.getAllArtworks().subscribe({
      next: (data) => {
        const selectedData = data.filter(x => this.ids.includes(x._id));
        selectedData.forEach(i => {
          i.title = StringHelper.sanitizeString(i.title);
        })
        this.likedArtworks = selectedData;
      }
    })
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

}
