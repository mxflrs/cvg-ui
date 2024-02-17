import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full flex-1 bg-slate-500">
      <p class="">home works!</p>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {}
