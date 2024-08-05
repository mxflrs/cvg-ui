import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="grid grid-cols-10 gap-3 pt-24"
      [ngClass]="sectionCustomClass"
    >
      <div class="col-span-8 w-full col-start-2">

      <div class="flex justify-between items-center">

        <div class="flex gap-6" [ngClass]="hasNavigation ? 'visible' : 'invisible'">
          <button>
            <i class="ri-arrow-left-line hover:bg-cvg-100 bg-cvg-50 p-2"></i>
          </button>
          <button>
            <i class="ri-arrow-right-line hover:bg-cvg-100 bg-cvg-50 p-2"></i>
          </button>
        </div>

        <div
        class="flex justify-end items-center w-full gap-4 pb-16"
        [ngClass]="containerCustomClass"
        >
        <h2>{{ title }}</h2>

        @if(url != "") {
          <a [href]="url" class="text-black ri-2">
            <i class="ri-add-line hover:bg-cvg-200 bg-cvg-100 p-2"></i>
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
}
