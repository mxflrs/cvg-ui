import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../../services/home.service';
import { images } from '../../../../core/models/images.interface';

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

  ngOnInit(): void {
    this.#homeServices.getImages().subscribe({
      next: (result) => {
        this.imagesData = result;
        console.log(this.imagesData);
      },
      error: (e) => console.log(e)
    })
  }

}
