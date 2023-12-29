import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ErrorComponent } from './pages/error.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
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
