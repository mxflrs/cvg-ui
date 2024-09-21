import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactModalComponent } from "../../shared/components/contact-modal.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ContactModalComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
