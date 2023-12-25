import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="">
      <aside class="bg-violet-300 p-2 h-screen">
        <h1>Welcome to {{ title }}</h1>
      </aside>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
    main {
      display: flex;
    }
  `
})
export class AppComponent {
  title = 'The Jungle';
}
