import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="grid grid-cols-12">

      <aside class="col-span-2">
        <app-navigation />
      </aside>

      <div class="col-span-10">
        <router-outlet class="hidden" />
      </div>

    </main>
  `
})
export class AppComponent {
}
