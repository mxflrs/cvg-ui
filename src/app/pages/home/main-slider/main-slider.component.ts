import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/services/home.service';
import { images } from 'src/app/core/models/images.interface';
import { sampleImages } from 'src/assets/data/images';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent implements OnInit {
  #homeServices = inject(HomeService);
  public imagesData: images[] = [];
  public imageOnDisplayIndex = 0;

  public imagesToDisplay = structuredClone(sampleImages);

  ngOnInit(): void {
    // this.#homeServices.getImages().subscribe({
    //   next: (result) => {
    //     this.imagesData = result;
    //     console.log(this.imagesData);
    //   },
    //   error: (e) => console.log(e)
    // })
  }

  navigateToImage(index: number) {
    this.imageOnDisplayIndex = index;
  }
}
