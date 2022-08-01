import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upipayment',
  templateUrl: './upipayment.component.html',
  styleUrls: ['./upipayment.component.css']
})
export class UpipaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  paymentRequest:google.payments.api.PaymentDataRequest={
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type:'CARD',
        parameters:{
          allowedAuthMethods:['PAN_ONLY','CRYPTOGRAM_3DS'],
          allowedCardNetworks:['AMEX','VISA','MASTERCARD']
        },
        tokenizationSpecification:{
          type:'PAYMENT_GATEWAY',
          parameters:{
            gateway:'example',
            gatewayMarchantId:'exampleGateWayMerchantId'
          }
        }
      }
    ],
    merchantInfo:{
      merchantId:'12345678901234567890',
      merchantName:'Demo Mechant'

  },
    transactionInfo: {
      totalPriceStatus:'FINAL',
      totalPriceLabel:'Total',
      totalPrice:'0.10',
      currencyCode:'EUR',
      countryCode:'BE'
    },
    callbackIntents:['PAYMENT_AUTHORIZATION']
  }

  onLoadPaymentData=(event:Event):void=>{
    const eventDetail=event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data',eventDetail.detail)
  }

  onPaymentDataAuthorized :google.payments.api.PaymentAuthorizedHandler=(paymentData)=>{
    console.log('payment authorized',paymentData)
    return{
      transactionState:'SUCCESS'
    }
  }

onError=(event :ErrorEvent):void =>{
  console.error('error',event.error)
}
}
