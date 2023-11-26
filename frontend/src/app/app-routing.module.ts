import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';

const routes: Routes = [
  {path:'', component:BibliotecaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
