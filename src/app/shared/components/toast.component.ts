import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  standalone: true,
  template: `
  <div *ngIf="isVisible" class="fixed bottom-5 right-5 p-4 rounded-sm text-white z-[999] transition-all ease-in-out" [ngClass]="type" (click)="close()">
    {{ message }}
  </div>`,
  styles: [
    `
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
