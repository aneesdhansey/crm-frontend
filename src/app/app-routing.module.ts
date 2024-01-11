import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustmasterComponent } from './custmaster/custmaster.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'custmaster',
    pathMatch: 'full',
  },
  {
    path: 'custmaster',
    component: CustmasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
