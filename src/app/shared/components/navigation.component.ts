import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { menuinterface } from '../../core/models/menu.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="flex-1 bg-cvg-100 h-screen p-4 w-full relative">

      <div class="bg-cvg-200 absolute top-0 left-0 w-full">
        <a routerLink="/">
          <img src="/assets/images/cvg-logo.png" alt="" class="w-full h-auto px-12 py-8">
        </a>
      </div>

      <ul class="pt-32">
        @for (menuItem of menuSignal(); track $index) {
        <li>
          <a [routerLink]="menuItem.link">{{ menuItem.label }}</a>
        </li>
        }
      </ul>
    </nav>
  `,
})

export class NavigationComponent implements OnInit {
  #menuService = inject(MenuService);
  public menuSignal: WritableSignal<menuinterface[]> = signal([]);

  ngOnInit(): void {
    this.#menuService.getNavigation().subscribe({
      next: (data) => {
        console.log(data);
        this.menuSignal.set(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
