import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: ` <p class="">home works!</p> `,
  styles: ``,
})
export class HomeComponent {}
