import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";

@Component({
  selector: 'app-limited-edition',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './limited-edition.component.html',
  styleUrl: './limited-edition.component.scss'
})
export class LimitedEditionComponent {

}
