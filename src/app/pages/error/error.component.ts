import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
    <p>
      error works!
    </p>
  </div>
  `,
  styles: ``
})
export class ErrorComponent {

}
