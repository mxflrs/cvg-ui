import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { images } from 'src/app/core/models/images.interface';

@Component({
  selector: 'app-image-preview-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (openModal) {
    <section class="h-dvh w-full fixed top-0 left-0 bg-cvg-475 z-[9999] backdrop-blur-sm px-72">
      <div class="flex justify-start items-center w-full h-full p-4 gap-4 texture-3">
        @if (selectedImage) {
          <img
          [src]="selectedImage.url"
          alt="image"
          class="relative z-10 object-cover w-auto max-w-[70vw] h-full transition-all duration-200 rounded max-h-[70vh] group-hover:opacity-70"
          />
        }
        <button (click)="closeModal()" class="absolute top-4 right-4 btn">Close</button>
       <div class="flex flex-col gap-1 justify-start pt-4">
        <h3 class="text-white">{{selectedImage?.title}}</h3>
        <h4 class="text-white">{{selectedImage?.author}}</h4>
        <i
          class="z-40 px-2 py-1 rounded-sm bg-cvg-200 mr-auto mt-3"
          [ngClass]="isLiked ? 'ri-heart-3-fill' : 'ri-heart-3-line'"
        ></i>
       </div>
      </div>

      <!-- BUTTONS -->
       <div class="absolute bottom-8 right-8 flex gap-4 items-center">
         <i class="ri-arrow-left-line btn-round clear" (click)="onPrevAction()"></i>
         <i class="ri-arrow-right-line btn-round clear" (click)="onNextAction()"></i>
       </div>
    </section>
  }`
})

export class ImagePreviewModalComponent {
  @Input() openModal = false;
  @Output() openModalChange = new EventEmitter<boolean>();
  @Input() selectedImage: images | null = null;
  @Input() isLiked: boolean = false;
  // public liked = this.isLiked

  // ARROW ACTIONS
  @Output() nextAction = new EventEmitter();
  @Output() prevAction = new EventEmitter();

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
}
