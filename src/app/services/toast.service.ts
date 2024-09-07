import { Injectable } from '@angular/core';
import { ToastComponent } from 'src/app/shared/components/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastComponent!: ToastComponent;

  register(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    if (this.toastComponent) {
      this.toastComponent.show(message, type);
    }
  }
}
