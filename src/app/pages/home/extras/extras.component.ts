import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";

@Component({
  selector: 'app-extras',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.scss'
})
export class ExtrasComponent {

}
