import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';
import { CmsService } from 'src/app/services/cms.service';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner.component';
import { ContactModalComponent } from 'src/app/shared/components/contact-modal.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ContactModalComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  public ids: string[] = [];
  public likedArtworks: Artworks[] = [];
  public currentIndex = -1;
  public showContactModal = false;
  public message = '';

  constructor(private storeService: StoreArtworksService, private cmsService: CmsService, private imageBuilder: ImageBuilderService) { }

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

  onHoverItem(e: number) {
    this.currentIndex = e;
  }

  onArtworkDelete(id: string) {
    this.storeService.deleteArtworkById(id);
    this.loadArtworksFromLocalHost();
    this.loadAllArtworks();
  }

  onOpenModal(id?: string) {
    if (id) {
      const inquiredArtwork = this.likedArtworks.filter(i => i._id == id);
      this.message = `Hi there, I’m interested in the following artwork: [${inquiredArtwork[0].title} by ${inquiredArtwork[0].artist.name}]. Could you please provide more details on their availability and pricing?`
      this.showContactModal = true;
    } else {
      const allArtworks = this.likedArtworks.flatMap(a => a.title);
      this.message = `Hi there, I’m interested in the following artworks: [${allArtworks}]. Could you please provide more details on their availability and pricing?`
      this.showContactModal = true;
    }

    console.log(this.message);
  }
}
