import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="grid grid-cols-10 gap-3 pt-24" [ngClass]="sectionCustomClass">

      <div class="col-span-9 w-full">
        <div class="flex justify-end items-center w-full gap-4 pb-16" [ngClass]="containerCustomClass">
          <h2>{{ title }}</h2>

          @if(url != "") {
            <a [href]="url" class="text-black ri-2">
              <i class="ri-link bg-cvg-200 p-2"></i>
            </a>
          }
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
}
