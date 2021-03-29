import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDistributorComponent } from './add-distributor/add-distributor.component';
import { DistributorsComponent } from './distributors/distributors.component';

const routes: Routes = [
  { path: '', redirectTo: '/distributors', pathMatch: 'full' },
  { path: 'distributors', component: DistributorsComponent },
  { path: 'distributors/add', component: AddDistributorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
