import { Component } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="grid grid-cols-12">

      <aside class="col-span-2" [ngClass]=""]>
        <app-navigation />
      </aside>

      <div class="col-span-10 main-container">
        <router-outlet class="hidden" />
      </div>

    </main>
  `,
  styles: `
    .main-container {
      width: calc(100vw - 16rem);
      margin-left: auto;
    }
  `
})
export class AppComponent {
  hideSideBar = false;
  
  constructor(private cmsService: CmsService){
    this.cmsService.getData();
  }
}
