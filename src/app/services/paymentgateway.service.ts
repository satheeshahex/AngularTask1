import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentgatewayService {

  constructor(
    private _http:HttpClient
    
  ) { }

  public paynow(data:any):Observable<any>{
    console.log(data)
    if(data.name !=null || data.email !=null  || data.phone !=null && data.amount !=null) {
   
      return of({
      
        MID: 'exampleGateWayMerchantId',
        WEBSITE: 'WEBSTAGING',
        CHANNEL_ID: 'WEB',
        INDUSTRY_TYPE_ID: 'Retail',
        ORDER_ID: 'TEST_'+ new Date().getTime(),
        CUST_ID: data.name,
        TXN_AMOUNT: data.amount,
        EMAIL: data.amount,
        MOBILE_NO: data.phone
          });

         
  }
  else{
 
  }
 
    return throwError(new Error('Failed to login'))
   
  }
}
