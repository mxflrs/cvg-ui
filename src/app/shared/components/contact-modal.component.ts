import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
        <section class="h-dvh w-full fixed top-0 left-0 bg-cvg-475 z-[9999] backdrop-blur-sm texture-2">

          <div class="flex justify-center align-center flex-col items-center w-full h-full">
            <form action="">
              <div class="form-group">
                <label for="1"></label>
                <input type="text" src="" alt="">
              </div>

              <div class="form-group">
                <label for="1"></label>
                <input type="text" src="" alt="">
              </div>

              <div class="form-group">
                <label for="1"></label>
                <input type="text" src="" alt="">
              </div>

              <button>Send</button>
              <button>Clear</button>
            </form>
1
          </div>
        </section>
            `,
  styles: ``
})
export class ContactModalComponent {

}
