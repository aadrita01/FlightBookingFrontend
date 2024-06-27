import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: Flight[];

  response: boolean=false;

  constructor(private http: HttpClient,private SearchService:SearchService,private router:Router,
    private loginService:LoginService) { }

  ngOnInit(): void {
      this.getFlights();
  }

  getFlights(): void {
    const searchData = this.SearchService.getSearchData();
    
    const date=new Date(searchData.departureDate);
    const isoDate = date.toISOString().split('T')[0];
    const params={origin:searchData.origin, destination:searchData.destination, departureDate:isoDate};
    this.http.get<Flight[]>('http://localhost:8765/search/searchflights',{params})
      .subscribe(flights => {
        if (flights.length > 0) {
          this.response = true;
          this.flights = flights;
          this.flights.forEach(flight => {
            this.getFare(flight.flightId);
          });
        } else {
          // Set response to false when no flights are available
          this.response = false;
        }
      },
      error => {
        // Handle error if the HTTP request fails
        console.error('Error fetching flights:', error);
        // Set response to false when an error occurs
        this.response = false;
      }
    );
  }

  getFare(flightId: string): void{
    this.http.get<number>(`http://localhost:8765/fare/getfare/${flightId}`)
      .subscribe(fare => {
        const flight = this.flights.find(f => f.flightId === flightId);
        if(flight) {
          flight.fare=fare;
          // this.SearchService.setFare(fare);
        }
      });
  }

  navigateToBooking(flightId:string):void {
    this.http.get<number>(`http://localhost:8765/fare/getfare/${flightId}`)
      .subscribe(fare => {
    this.SearchService.setFare(fare);
      })

    if(this.loginService.getIsLoggedIn()){
      this.router.navigate(['/book']);
    }else{
      alert("Please Login to book a flight")
    }
    
  }
}
