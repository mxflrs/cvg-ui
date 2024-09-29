import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ArtistsComponent } from 'src/app/pages/artists/artists.component';
import { SingleArtistsComponent } from 'src/app/pages/single-artists/single-artists.component';
import { FavoritesComponent } from 'src/app/pages/favorites/favorites.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { ArtworksComponent } from 'src/app/pages/artworks/artworks.component';
import { SingleArtworkComponent } from 'src/app/pages/single-artwork/single-artwork.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { PrintsComponent } from 'src/app/pages/prints/prints.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'artists',
    component: ArtistsComponent,
  },
  {
    path: 'artists/:id',
    component: SingleArtistsComponent,
  },
  {
  path: 'artworks',
  component: ArtworksComponent,
  },
  {
  path: 'artworks/:id',
  component: SingleArtworkComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'prints',
    component: PrintsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '**',
    title: '404',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
