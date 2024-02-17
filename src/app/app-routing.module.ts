import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ErrorComponent } from './pages/error.component';
import { OriginalsComponent } from './pages/originals.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'originals',
    component: OriginalsComponent
  },
  // {
  //   path: '',
  //   component:HomeComponent
  // },
  {
    path: '**',
    title: 'Oops!',
    component:ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
