import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { menuinterface } from 'src/app/core/models/menu.interface';
import { StoreArtworksService } from 'src/app/services/store-artworks.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav
      class="bg-cvg-500 h-screen p-4 w-64 fixed flex flex-col justify-between bg-white border-r-[1px]"
      [ngClass]="{ 'w-8': hideSideBar }"
    >
      <!-- LOGO -->
      <div class="bg-cvg-400 absolute top-0 left-0 w-full h-32">
        <a routerLink="/">
          <img
            src="/assets/images/cvg-logo-w.png"
            alt=""
            class="w-full h-full px-8 py-4 object-contain box-border"
          />
        </a>

        <!-- TOGGLE -->
        <button
          class="bg-cvg-200 hover:bg-cvg-accent2 size-8 absolute -bottom-4 -right-4 z-20 rounded-sm texture2"
          [ngClass]="{ 'rotate-180': hideSideBar }"
          (click)="onHideSideBar()"
        >
          <i class="ri-arrow-left-s-fill"></i>
        </button>
      </div>

      <!-- LINKS -->
      <ul
        class="mt-32 flex flex-col gap-2 p-4"
        [ngClass]="{ hidden: hideSideBar }"
      >
        @for (menuItem of menuSignal(); track $index) {
        <li class="group">
          <a
            [routerLink]="menuItem.link"
            routerLinkActive="font-black text-black"
            class="flex justify-start gap-2 items-center text-cvg-400 group-hover:text-cvg-accent2 text-nowrap"
            ><span class="bullet group-hover:bg-cvg-accent2"></span>{{ menuItem.label }}</a
          >
        </li>
        }
      </ul>

      <!-- ADDRESS -->
      <section
        class="flex flex-col gap-4 w-auto pb-4"
        [ngClass]="{ hidden: hideSideBar }"
      >
        <i class="ri-map-2-line ri-2x bg-cvg-75 hover:bg-cvg-200 px-4 py-2 mr-auto cursor-pointer"></i>
        <div>
          <h5 class="max-w-48">
            #15 The Grove Plaza Seven Mile Beach Grand Cayman
          </h5>
        </div>
      </section>
    </nav>
  `,
})
export class NavigationComponent implements OnInit {
  @Input() hideSideBar: boolean = false;
  @Output() hideSideBarChange = new EventEmitter<boolean>();
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

  onHideSideBar() {
    this.hideSideBarChange.emit(!this.hideSideBar);
  }
}
