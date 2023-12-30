import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="flex">

      <aside>
        <app-navigation />
      </aside>

      <router-outlet />

    </main>
  `
})
export class AppComponent {
  title = 'The Jungle';
}
