import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from 'src/app/shared/components/navigation.component';
import { TitleComponent } from 'src/app/shared/components/title.component';
import { FooterComponent } from 'src/app/shared/components/footer.component';
import { ImageEnlargerComponent } from 'src/app/shared/components/image-enlarger.component';
import { ToastComponent } from "./shared/components/toast.component";
import { FavoriteIconComponent } from 'src/app/shared/components/favorite-icon.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "./shared/components/nav-bar.component";
import { SideMenuComponent } from "./shared/components/side-menu.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationComponent,
    HttpClientModule,
    TitleComponent,
    FooterComponent,
    ImageEnlargerComponent,
    ToastComponent,
    FavoriteIconComponent,
    FormsModule,
    NavBarComponent,
    SideMenuComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  @Input() currentImage = [];
}
