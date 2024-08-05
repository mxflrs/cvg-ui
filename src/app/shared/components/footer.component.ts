import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <footer class="p-8 bg-cvg-400 text-white flex justify-between capitalize text-xs">
    <p>All rights reserved  |  Carlos V Garcia 2024</p>
    <p>Web design & development by MXFLRS</p>
  </footer>
  `,
})

export class FooterComponent {

}
