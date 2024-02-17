import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="grid grid-cols-12 gap-6 last-of-type:col-span-6">

      <aside class="col-span-2">
        <app-navigation />
      </aside>

      <router-outlet class="hidden" />

    </main>
  `
})
export class AppComponent {
  title = 'The Jungle';
}
