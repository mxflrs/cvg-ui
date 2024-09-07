import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  standalone: true,
  template: `
  <div *ngIf="isVisible" class="toast" [ngClass]="type" (click)="close()">
    {{ message }}
  </div>`,
  styles: [
    `
    .toast {
     position: fixed;
     bottom: 20px;
     right: 20px;
     padding: 15px;
     border-radius: 5px;
     color: white;
     z-index: 1000;
     transition: opacity 0.5s ease;
   }

   .success {
     background-color: green;
   }

   .error {
     background-color: red;
   }

   .info {
     background-color: blue;
   }

   .warning {
     background-color: orange;
   }
    `
  ]
})

export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  isVisible: boolean = false;

  show(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.message = message;
    this.type = type;
    this.isVisible = true;

    setTimeout(() => {
      this.close();
    }, 3000); // Auto-close after 3 seconds
  }

  close() {
    this.isVisible = false;
  }
}
