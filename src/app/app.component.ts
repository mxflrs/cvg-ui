import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="bg-violet-300 p-2">
      <h1>Welcome to {{ title }}</h1>
    </div>
  `,
  standalone: false,
})

export class AppComponent {
  title = 'The Jungle';
}
