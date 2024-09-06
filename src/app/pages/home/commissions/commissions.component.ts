import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { ContentWrapperComponent } from 'src/app/shared/components/content-wrapper.component';

@Component({
  selector: 'app-commissions',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  templateUrl: './commissions.component.html',
  styleUrl: './commissions.component.scss'
})
export class CommissionsComponent {
  @Input() artworks: Artworks[] = [];
}
