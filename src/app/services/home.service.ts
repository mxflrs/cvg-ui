import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { images } from '../core/models/images.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  #imageData = 'assets/data/main-slider.json';
  #http = inject(HttpClient);

  getImages() {
    return this.#http.get<images[]>(this.#imageData);
  }
}
