import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { images } from 'src/app/core/models/images.interface';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { FavoriteIconComponent } from "./favorite-icon.component";
import { StoreArtworksService } from 'src/app/services/store-artworks.service';

@Component({
  selector: 'app-image-enlarger',
  standalone: true,
  imports: [CommonModule, FavoriteIconComponent],
  template: `
  @if (openModal) {
    <section class="h-dvh w-full fixed top-0 left-0 bg-cvg-475 z-[9999] backdrop-blur-sm texture-2">
      <div class="flex justify-center align-center flex-col items-center w-full h-full">

      <!-- IMAGE CONTAINER AND ARROWS -->
       <div class="flex gap-8 justify-center items-center">
          <i class="ri-arrow-left-line btn-round" (click)="onPrevAction()"></i>
          @if (selectedImage) {
            <div class="relative z-10 object-cover transition-all duration-200 rounded group-hover:opacity-70"
            >
              <img
              [src]="imageUrl(selectedImage.image.asset._ref) + '?q=75&fm=webp&w=800'"
              alt="image"
              class="w-auto max-w-[80vw] max-h-[80vh] h-full"
              />
              <app-favorite-icon
              [isLiked]="selectedImage.isLiked"
              [artworkInfo]="{id: selectedImage._id, title: selectedImage.title}"
              (refreshData)="reloadData()"
              />
            </div>
          }
          <i class="ri-arrow-right-line btn-round" (click)="onNextAction()"></i>
        </div>
        <button (click)="closeModal()" class="absolute top-4 right-4 btn">Close</button>
       <div class="flex gap-1 justify-start pt-4 *:text-white *:text-xs">
        <p class="capitalize">{{selectedImage.title}}</p>
        <p class="font-extralight italic">by {{selectedImage.artist.name}}</p>
       </div>
      </div>
    </section>
  }
  `,
})

export class ImageEnlargerComponent {
  @Input() openModal = false;
  @Output() openModalChange = new EventEmitter<boolean>();
  @Input() selectedImage: Artworks = {} as Artworks;

  // ARROW ACTIONS
  @Output() nextAction = new EventEmitter();
  @Output() prevAction = new EventEmitter();

  constructor(private imageBuilder: ImageBuilderService, private storeArtworksService: StoreArtworksService) { }

  ngOnInit() {
    this.loadData();
  }

  onNextAction() {
    this.nextAction.emit();
  }

  onPrevAction() {
    this.prevAction.emit();
  }

  closeModal() {
    this.openModal = false;
    this.openModalChange.emit(false);
    document.body.style.overflow = 'auto';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }

    if (event.key === 'ArrowLeft') {
      this.onNextAction();
    }

    if (event.key === 'ArrowRight') {
      this.onPrevAction();
    }
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

  loadData() {
    this.selectedImage = this.storeArtworksService.filteredLikedArtworks([this.selectedImage])[0];
  }

  reloadData() {
    this.loadData();
  }
}
