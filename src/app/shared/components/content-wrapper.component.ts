import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="grid grid-cols-10 gap-3 pt-24 relative"
      [ngClass]="sectionCustomClass"
    >
      <div class="col-span-8 w-full col-start-2">
        <div class="flex justify-between items-start">
          <!-- * ARROWS -->
          <div
            class="flex gap-6 h-auto items-start pt-4"
            [ngClass]="hasNavigation ? 'visible' : 'invisible'"
          >
            <button (click)="onNextAction()">
              <i
                class="ri-arrow-left-line hover:bg-cvg-100 bg-cvg-50 p-2 rounded-sm cursor-pointer"
              ></i>
            </button>
            <button (click)="onPrevAction()">
              <i
                class="ri-arrow-right-line hover:bg-cvg-100 bg-cvg-50 p-2 rounded-sm cursor-pointer"
              ></i>
            </button>
          </div>

          <!-- * TITLE -->
          <div
            class="flex justify-end items-center w-full gap-4 pb-16"
            [ngClass]="containerCustomClass"
          >
            <h2 [ngClass]="{ 'text-white': darkMode }">{{ title }}</h2>

            <!-- * LINK -->
            @if(url != "") {
            <a [href]="url" class="text-black ri-2">
              <i
                class="ri-add-line hover:bg-cvg-200 bg-cvg-100 p-2 rounded-sm"
              ></i>
            </a>
            }
          </div>
        </div>

        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class ContentWrapperComponent {
  @Input() title = '';
  @Input() url = '';
  @Input() sectionCustomClass = '';
  @Input() containerCustomClass = '';
  @Input() hasNavigation = false;
  @Input() darkMode = false;

  // ARROW ACTIONS
  @Output() nextAction = new EventEmitter();
  @Output() prevAction = new EventEmitter();

  onNextAction() {
    this.nextAction.emit();
  }

  onPrevAction() {
    this.prevAction.emit();
  }
}
