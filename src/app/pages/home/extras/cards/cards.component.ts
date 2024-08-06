import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() title = ''

  public backgroundUrl = '';

  onMouseEnter() {
    this.backgroundUrl = 'url(/assets/images/sample1.jpg)';
  }

  onMouseLeave() {
    this.backgroundUrl = '';
  }
}
