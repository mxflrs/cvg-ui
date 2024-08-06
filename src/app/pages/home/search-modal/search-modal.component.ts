import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss'
})
export class SearchModalComponent {
  @Input() showSearch = false;
  @Output() showSearchChange = new EventEmitter<boolean>();

  onCloseModal() {
    this.showSearchChange.emit(false);
  }
}
