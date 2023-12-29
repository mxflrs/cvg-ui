import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { menuinterface } from '../../core/models/menu.interface';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <ul>
        @for (menuItem of menuSignal(); track $index) {
        <li>{{ menuItem.label }}</li>
        }
      </ul>
    </section>
  `,
  styles: ``,
})
export class NavigationComponent {
  #menuService = inject(MenuService);
  public menuSignal: WritableSignal<menuinterface[]> = signal([]);

  ngOnInit(): void {
    this.#menuService.getNavigation().subscribe({
      next: (data) => {
        this.menuSignal.set(data)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
