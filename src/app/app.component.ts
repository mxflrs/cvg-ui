import { Component } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <main class="grid grid-cols-12">

      <aside class="col-span-2">
        <app-navigation />
      </aside>

      <div class="col-span-10">
        <router-outlet class="hidden" />
      </div>

    </main>
  `
})
export class AppComponent {
  constructor(private cmsService: CmsService){
    this.cmsService.getData();
  }
}
