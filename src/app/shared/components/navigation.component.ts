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
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-cvg-100 h-screen p-4 w-full relative flex flex-col justify-between">
      <!-- LOGO -->
      <div class="bg-cvg-200 absolute top-0 left-0 w-full">
        <a routerLink="/">
          <img
            src="/assets/images/cvg-logo.png"
            alt=""
            class="w-full h-auto px-12 py-8"
          />
        </a>
        <button class="bg-cvg-300 size-8 hover:rotate-180 absolute -bottom-4 -right-4 z-10" (click)="hideSideBar()">
          <i class="ri-arrow-left-s-fill text-white"></i>
        </button>
      </div>

      <!-- LINKS -->
      <ul class="mt-32 flex flex-col gap-2 p-4">
        @for (menuItem of menuSignal(); track $index) {
        <li>
          <a
            [routerLink]="menuItem.link"
            routerLinkActive="font-black text-black"
            class="flex justify-start gap-2 items-center text-cvg-300 text-nowrap"
            ><span class="bullet"></span>{{ menuItem.label }}</a
          >
        </li>
        }
      </ul>

      <!-- ADDRESS -->
      <section class="flex flex-col gap-4 w-auto pb-4">
        <i class="ri-map-2-line ri-2x bg-white px-4 py-2 mr-auto"></i>
        <div>

          <h5 class="max-w-48">#15 The Grove Plaza Seven Mile Beach Grand Cayman</h5>
        </div>
      </section>
    </nav>
  `,
})

export class NavigationComponent implements OnInit {
  #menuService = inject(MenuService);
  public menuSignal: WritableSignal<menuinterface[]> = signal([]);

  ngOnInit(): void {
    this.#menuService.getNavigation().subscribe({
      next: (data) => {
        this.menuSignal.set(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  hideSideBar() {
    console.log('HIDE')
  }
}
