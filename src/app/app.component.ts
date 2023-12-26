import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="flex">

      <aside class="bg-cvg-400 p-2 h-screen">
        <h1>Welcome to {{ title }}</h1>
      </aside>

      <router-outlet />

    </main>
  `
})
export class AppComponent {
  title = 'The Jungle';
}
