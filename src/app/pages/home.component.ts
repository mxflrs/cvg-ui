import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../shared/services/menu.service';

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
