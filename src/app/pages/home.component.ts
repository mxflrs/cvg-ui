import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-500 h-full min-h-screen">
      <h1>HEY</h1>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {}
