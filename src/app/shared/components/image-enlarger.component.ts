import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { images } from 'src/app/core/models/images.interface';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

@Component({
  selector: 'app-image-enlarger',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (openModal) {
    <section class="h-dvh w-full fixed top-0 left-0 bg-cvg-475 z-[9999] backdrop-blur-sm">
      <div class="flex justify-center align-center flex-col items-center w-full h-full">

      <!-- IMAGE CONTAINER AND ARROWS -->
       <div class="flex gap-8 justify-center items-center">
          <i class="ri-arrow-left-line btn-round" (click)="onPrevAction()"></i>
          @if (selectedImage) {
            <img
            [src]="imageUrl(selectedImage.image.asset._ref) + '?q=75&fm=webp&w=800'"
            alt="image"
            class="relative z-10 object-cover w-auto max-w-[70vw] h-full transition-all duration-200 rounded max-h-[70vh] group-hover:opacity-70"
            />
          }
          <i class="ri-arrow-right-line btn-round" (click)="onNextAction()"></i>
        </div>
        <button (click)="closeModal()" class="absolute top-4 right-4 btn">Close</button>
       <div class="flex flex-col gap-1 justify-start pt-4">
        <p class="text-white">{{selectedImage.title}}</p>
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

  constructor(private imageBuilder: ImageBuilderService) { }

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
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }
}
