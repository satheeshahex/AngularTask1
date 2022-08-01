import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpipaymentComponent } from './upipayment/upipayment.component';

const routes: Routes = [
  {
    path:'',
    component:UpipaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
