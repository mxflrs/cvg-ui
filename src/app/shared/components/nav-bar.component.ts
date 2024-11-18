import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuService } from "src/app/services/menu.service";
import { menuinterface } from "src/app/core/models/menu.interface";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SideMenuComponent } from "src/app/shared/components/side-menu.component";

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SideMenuComponent],
  template: `
    <div class="bg-black w-full">
      <div class="lg:flex grid grid-cols-3 justify-between border-b-2 border-cvg-100 items-center">
        <!-- 0 / Mobile -->
        <div class="sm:hidden block mr-auto pl-4">
          <div class="flex items-center gap-2 text-white">
            <!-- <a href="https://web.facebook.com/chilevenenoso" aria-label="social-icons">
              <i class="ri-facebook-fill hover:text-cvg-accent2 ri-xl"></i>
            </a> -->
            <a href="https://www.instagram.com/carlosv.garcia_fineartgallery/" aria-label="social-icons">
              <i class="ri-instagram-line hover:text-cvg-accent2 ri-xl"></i>
            </a>
          </div>
        </div>

        <!-- 1 -->
        <div class="flex bg-black md:w-64 w-auto md:pl-8 texture-2 py-2">
          <a routerLink="/">
            <img
              src="/assets/images/cvg-logo-w.png"
              alt=""
              class="w-full h-full px-4 py-2 object-contain box-border"
            />
          </a>
        </div>

        <!-- 2 -->
        <ul class="flex-1 pr-8 justify-end sm:flex items-center lg:gap-8 gap-4 hidden bg-white col-span-2 h-full">
          @for (menuItem of menuSignal(); track $index) {
            <li class="group">
              <a
                [routerLink]="menuItem.link"
                routerLinkActive="font-black text-black"
                class="flex justify-start gap-2 items-center text-cvg-400 group-hover:text-cvg-accent2 text-nowrap"
                >{{ menuItem.label }}</a>
            </li>
          }
        </ul>

        <!-- 2 / Mobile -->
        <div class="block sm:hidden text-white ml-auto pr-4">
            <button (click)="onOpenSideMenu()">
              <i class="ri-menu-4-fill hover:text-cvg-accent2 ri-xl"></i>
            </button>
        </div>

      </div>
    </div>
  `,
})
export class NavBarComponent {
  #menuService = inject(MenuService);
  public menuSignal: WritableSignal<menuinterface[]> = signal([]);
  @Output() openSideMenu = new EventEmitter();

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

  onOpenSideMenu() {
    this.openSideMenu.emit();
  }
}
