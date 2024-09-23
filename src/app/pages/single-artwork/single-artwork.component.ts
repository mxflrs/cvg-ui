import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsService } from 'src/app/services/cms.service';
import { ActivatedRoute } from '@angular/router';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { ImageBuilderService } from 'src/app/services/image-builder.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner.component';

@Component({
  selector: 'app-single-artwork',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './single-artwork.component.html',
  styleUrl: './single-artwork.component.scss'
})
export class SingleArtworkComponent {
  public id = '';
  public currentArtwork = {} as Artworks;

  constructor(private cmsService: CmsService, private route: ActivatedRoute, private imageBuilder: ImageBuilderService) {}

  ngOnInit() {
    this.loadIdFromParam();
    this.loadService();
  }

  loadIdFromParam() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.id = id;
    })
  }

  loadService() {
    this.cmsService.getArtworkById(this.id).subscribe({
      next: (data) => {
        const rawData = structuredClone(data);
        rawData.forEach((i) => {
          i.title = StringHelper.sanitizeString(i.title);
        })

        this.currentArtwork = rawData[0];
      }
    })
  }

  imageUrl(id: string) {
    return this.imageBuilder.image(id).url();
  }

}
