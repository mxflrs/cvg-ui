import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <footer class="p-8 bg-cvg-400 text-white flex sm:justify-between capitalize text-xs mt-auto flex-col sm:flex-row gap-2 justify-center">
    <p class="text-center lg:text-left">All rights reserved  |  Carlos V Garcia 2024</p>
    <a class="text-center lg:text-right" href="https://maxflores.dev" target="_blank">Web design & development by MXFLRS</a>
  </footer>
  `,
})

export class FooterComponent {

}
