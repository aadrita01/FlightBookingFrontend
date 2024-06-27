import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  passengerForm: FormGroup;
  passengerCount: number;
  totalCost: number;

  constructor(private fb: FormBuilder,private http: HttpClient,private searchService:SearchService,private router:Router) {
    this.passengerForm = this.fb.group({
      numberOfPassengers: [2, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit() {
    
    const numberOfPassengers = this.passengerForm.get('numberOfPassengers').value;
    // Perform any additional logic if needed
    if(numberOfPassengers>5){
      alert("Cannot take more than 5 members at once")
      return;
    }
    this.updatePassengerCount(numberOfPassengers);
  }

  updatePassengerCount(count: number) {
    // Add any additional logic if needed
    this.passengerCount = count;
  }

  onNext():void{
    // const getData=this.searchService.getFlightId();
    // const params={nop:this.passengerCount,flightId:getData.toString()};
    // this.http.get('http://localhost:8004/gettotalfare',{params})
    //   .subscribe(cost=>{
    //       this.searchService.setTotalCost(cost);
    //     }
    //   );
      const fare=this.searchService.getFare();
      const totalCost=fare*this.passengerCount;
      this.searchService.setTotalCost(totalCost);
      this.router.navigate(['/payment']);
  }
}
