import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsPageComponent } from 'src/pages/animals-page/animals-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'animals',
    pathMatch: 'full'
  },
  {
    path: 'animals',
    component: AnimalsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
