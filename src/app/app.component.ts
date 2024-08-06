import { Component } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="flex p-0 m-0">

      <aside class="w-64 z-20" [ngClass]="{'w-8': hideSideBar}">
        <app-navigation [(hideSideBar)]="hideSideBar" />
      </aside>

      <div class="flex-1 z-10">
        <div class="flex flex-col min-h-screen justify-between">
          <router-outlet class="hidden" />
          <app-footer />
        </div>
      </div>

    </main>
  `,
})
export class AppComponent {
  hideSideBar = false;

  constructor(private cmsService: CmsService){

  }
}
