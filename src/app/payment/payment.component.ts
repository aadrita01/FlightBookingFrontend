import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

declare var Razorpay:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  totalCost: number;

  constructor(private service:SearchService, private router:Router){}

  ngOnInit():void{
    this.getCost();
  }

  getCost():void{
    this.totalCost=this.service.getTotalCost();
    console.log(this.totalCost)
  }

  payNow(){
    const RazorpayOptions = {
      description: 'Payment Integration',
      currency: 'INR',
      amount: this.totalCost*100,
      name: 'SkySwift',
      key: 'rzp_test_hjwXSTFuiRzsqj',
      image: 'src\assets\logo.png',
      prefill: {
        name: 'aadrita adhikary',
        email: 'aadri@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
        
      },
      handler: (response: any) => {
        // Handle the success callback
        console.log('Payment success:', response);

        // Extract payment_id from the response
        const paymentId = response.razorpay_payment_id;
        this.service.setTranId(paymentId);
        this.service.postData(paymentId.toString()).subscribe(
          (response) => {
            // Handle the response from the backend
            console.log('Response from backend:', response);
          }
        );
        
        // Navigate to the confirmation page after successful payment
        this.router.navigate(['/confirm']);
      },
    }

    Razorpay.open(RazorpayOptions)
  }

  toConfirmPage(paymentid):void{
    this.service.setTranId(paymentid);
    this.router.navigate(['/confirm']);
  }
  
}
