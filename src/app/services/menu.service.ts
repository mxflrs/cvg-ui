import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { menuinterface } from 'src/app/core/models/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  #navigationUrl = 'assets/data/menu-navigation.json';
  #http = inject(HttpClient);

  getNavigation(): Observable<menuinterface[]> {
    return this.#http.get<menuinterface[]>(this.#navigationUrl);
  }
}
