import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaytmComponent } from './paytm/paytm.component';
import { UpipaymentComponent } from './upipayment/upipayment.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'googlepay',
    component:UpipaymentComponent
  },
  {
    path:'paytm',
    component:PaytmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
