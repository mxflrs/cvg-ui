import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsService } from 'src/app/services/cms.service';
import { Artists } from 'src/app/core/models/artists.interface';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {
  public artists: Artists[] = [];
  constructor(private cmsService: CmsService){}

  ngOnInit() {
    this.cmsService.getAllArtists().subscribe({
      next: (data) => {
        this.artists = data;
      }
    });
  }
}
