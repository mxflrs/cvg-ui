import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { menuinterface } from '../../core/models/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public navigationUrl = 'assets/data/menu-navigation.json';
  private http = inject(HttpClient)

  getNavigation(): Observable<menuinterface[]> {
    return this.http.get<menuinterface[]>(this.navigationUrl);
  }
}
