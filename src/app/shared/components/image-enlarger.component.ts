import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { images } from 'src/app/core/models/images.interface';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { FavoriteIconComponent } from "./favorite-icon.component";
import { StoreArtworksService } from 'src/app/services/store-artworks.service';
import { NavigationEnd, Router } from '@angular/router';
import { ContactModalComponent } from 'src/app/shared/components/contact-modal.component';

@Component({
  selector: 'app-image-enlarger',
  standalone: true,
  imports: [CommonModule, FavoriteIconComponent, ContactModalComponent],
  template: `
  @if (openModal) {
    <section class="h-dvh w-full fixed top-0 left-0 bg-cvg-475 z-50 backdrop-blur-sm texture-2">
      <div class="flex justify-center align-center flex-col items-center w-full h-full">

      <!-- IMAGE CONTAINER AND ARROWS -->
       <div class="flex gap-8 justify-center items-center" (click)="$event.stopPropagation()">
          <i class="ri-arrow-left-line btn-round !hidden md:!flex" (click)="onPrevAction()"></i>
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
          <i class="ri-arrow-right-line btn-round !hidden md:!flex" (click)="onNextAction()"></i>
        </div>
        <button (click)="closeModal()" class="absolute top-4 right-4 btn">Close</button>
       <div class="flex flex-col justify-center gap-1 pt-4 *:text-white *:text-xs items-center">
        <div class="flex gap-1">
          <p class="capitalize">{{selectedImage.title}}</p>
          <p class="font-extralight italic">by {{selectedImage.artist.name}}</p>
        </div>
        <p class="!mt-2 capitalize text-xs underline underline-offset-8 hover:text-cvg-100 text-cvg-accent2 cursor-pointer hidden sm:block"(click)="onOpenContactModal(selectedImage.title)">Get this artwork</p>
       </div>
      </div>

      <!-- ARROWS MOBILE -->
       <div class="absolute bottom-0 w-full left-0 justify-between flex sm:hidden p-8">
         <i class="ri-arrow-left-line btn-round" (click)="onPrevAction()"></i>
         <p class="!mt-2 capitalize text-xs underline underline-offset-8 hover:text-cvg-100 text-cvg-accent2 cursor-pointer"(click)="onOpenContactModal(selectedImage.title)">Get this artwork</p>
         <i class="ri-arrow-right-line btn-round" (click)="onNextAction()"></i>
       </div>
    </section>
    <app-contact-modal [(openContact)]="showContactModal" [emailFrom]="'About Page'" [subject]="'Contact Information'" />
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
  public showContactModal = false;
  public message = '';

  constructor(private imageBuilder: ImageBuilderService, private storeArtworksService: StoreArtworksService, private router: Router) { }

  ngOnInit() {
    this.loadData();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeModal();
      }
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['selectedImage']) {
  //     console.log(this.selectedImage)
  //   }
  // }

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

  onOpenContactModal(title: string) {
    if (title) {
      this.message = `Hi there, I’m interested in the following artwork: [ ${title} ]. Could you please provide more details on their availability and pricing?`
      this.showContactModal = true;
    }
  }


  reloadData() {
    this.loadData();
  }
}
