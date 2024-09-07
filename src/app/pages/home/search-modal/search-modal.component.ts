import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ImageBuilderService } from 'src/app/services/image-builder.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss'
})
export class SearchModalComponent {
  @Input() showSearch = false;
  @Input() artworks: Artworks[] = [];
  @Output() showSearchChange = new EventEmitter<boolean>();
  public filteredArtworks: Artworks[] = [...this.artworks];
  public isSearching = false;

  constructor(private imageBuilder: ImageBuilderService){}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.showSearchChange.emit(false);
    }
  }

  onInputChange(e: Event) {
    const inputText = (e.target as HTMLInputElement).value;
    inputText.length > 0 ? this.isSearching = true : this.isSearching = false;

    this.filteredArtworks = this.artworks.filter(x =>
      x.title.toLowerCase().includes(inputText) ||
      x.artist.name.toLowerCase().includes(inputText)
    );
  }

  onCloseModal() {
    this.showSearchChange.emit(false);
    document.body.style.overflow = 'auto';
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }
}
