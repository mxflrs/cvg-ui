import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from "../../../shared/components/content-wrapper.component";

@Component({
  selector: 'app-merchandise',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './merchandise.component.html',
  styleUrl: './merchandise.component.scss'
})
export class MerchandiseComponent {

}
