import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import { menuinterface } from 'src/app/core/models/menu.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="w-screen h-[100dvh] bg-cvg-400 absolute top-0 left-0 z-[999]" *ngIf="hideSideBar">
    <ul
        class="mt-8 flex flex-col gap-4 p-4 items-center"
      >
        @for (menuItem of menuSignal(); track $index) {
          <li class="group">
            <a
              [routerLink]="menuItem.link"
              routerLinkActive="font-black text-black"
              class="flex justify-start gap-2 items-center text-cvg-100 group-hover:text-cvg-accent2 text-nowrap text-2xl"
              (click)="onHideSideBar()"
              >{{ menuItem.label }}</a>
          </li>
        }
      </ul>
      <button class="absolute bottom-0 left-0 z-50 w-screen bg-white py-8 active:bg-cvg-accent2 active:text-cvg-450" (click)="onHideSideBar()">Close</button>
    </aside>
  `
  ,
})
export class SideMenuComponent {
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
