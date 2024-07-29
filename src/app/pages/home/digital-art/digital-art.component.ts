import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";

@Component({
  selector: 'app-digital-art',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './digital-art.component.html',
  styleUrl: './digital-art.component.scss'
})
export class DigitalArtComponent {

}
