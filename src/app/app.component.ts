import { Component, ViewChild } from "@angular/core";
import { ToastService } from "src/app/services/toast.service";
import { ToastComponent } from "src/app/shared/components/toast.component";

@Component({
  selector: "app-root",
  standalone: false,
  template: `
    <main class="flex p-0 m-0">
      <aside
        class="w-64 z-20 hidden lg:block"
        [ngClass]="{ 'w-8': hideSideBar }"
      >
        <app-navigation [(hideSideBar)]="hideSideBar" />
      </aside>

      <div class="flex-1 z-10">
        <div class="flex flex-col min-h-screen justify-between">
          <nav class="block lg:hidden">
            <app-nav-bar />
          </nav>
          <router-outlet class="hidden" />
          <app-footer />
        </div>
      </div>

      <app-toast />
    </main>
  `,
})
export class AppComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  public hideSideBar = false;

  constructor(private toastService: ToastService) {}

  ngAfterViewInit() {
    this.toastService.register(this.toast);
  }

  showToast() {
    this.toastService.show("This is a toast message!", "warning");
  }
}
