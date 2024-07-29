import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-end items-center w-full gap-2">
      <h2>{{ title }}</h2>
      <a [href]="url" class="text-black ri-2">
        <i class="ri-link bg-cvg-200 p-2"></i>
      </a>
    </div>
  `,
})
export class TitleComponent {
  @Input() title = '';
  @Input() url = '';
}
