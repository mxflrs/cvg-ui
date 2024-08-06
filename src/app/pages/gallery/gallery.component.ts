import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { CmsService } from 'src/app/services/cms.service';
import { sanityImage } from 'src/app/core/models/sanity-image.interface';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  public slug = '';
  public artist = 'Carlos V Garcia';
  public artworks: sanityImage[] = [];

  constructor(private route: ActivatedRoute, private imageBuilder: ImageBuilderService, private cmsService: CmsService) {
    this.cmsService.getArtworksByArtistName(this.artist).subscribe({
      next: (data) => {
        this.artworks = data;
      },
      complete: () => {
        console.log(this.artworks);
      }
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.loadContentBasedOnSlug(this.slug);
    });
  }

  loadContentBasedOnSlug(slug: string) {
    console.log(slug)
  }

  sanitizeTitle() {
    let sanitizedTitle = this.slug.replace(/-/g, ' ');
    sanitizedTitle = sanitizedTitle.replace(/\b\w/g, char => char.toUpperCase());
    return sanitizedTitle;
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }
}
