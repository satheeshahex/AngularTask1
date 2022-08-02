import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentgatewayService } from '../services/paymentgateway.service';

@Component({
  selector: 'app-paytm',
  templateUrl: './paytm.component.html',
  styleUrls: ['./paytm.component.css']
})
export class PaytmComponent implements OnInit {
  paytmForm!: FormGroup;
List:any;
form_fields :any

  constructor(
    private _paymentgatewayService :PaymentgatewayService 
  ) { }

  ngOnInit(): void {
    this.paytmForm=new FormGroup({
      name:new FormControl(null),
      email:new FormControl(null),
      phone:new FormControl(null),
      amount:new FormControl(null)
    })
  }


  onsubmit(){
  this._paymentgatewayService.paynow(this.paytmForm.value).subscribe(res=>{
    console.log(res)
    this.List=res;
   
      
    window.location.href = 'https://securegw-stage.paytm.in/theia/processTransaction';
  })
  }
}
