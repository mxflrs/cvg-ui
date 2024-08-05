import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";

@Component({
  selector: 'app-furniture-and-applied-arts',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './furniture-and-applied-arts.component.html',
  styleUrl: './furniture-and-applied-arts.component.scss'
})
export class FurnitureAndAppliedArtsComponent {

}
