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

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="flex-1 bg-cvg-300 h-screen p-4">
      <ul>
        @for (menuItem of menuSignal(); track $index) {
        <li>{{ menuItem.label }}</li>
        }
      </ul>
    </section>
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
}
