import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { BibliotecaListComponent } from './biblioteca-list/biblioteca-list.component';

const routes: Routes = [
  {path:'biblioteca', component:BibliotecaComponent},
  {path:'list', component:BibliotecaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
