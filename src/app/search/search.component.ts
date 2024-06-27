import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchForm={
    origin: '',
    destination: '',
    departureDate: new Date()
};

  constructor(private router: Router,private SearchService: SearchService) {}

  searchFlights() {
    if (this.searchForm.origin.trim() === '' || this.searchForm.destination.trim() === '') {
      alert('Cannot Search Empty Fields.Please fill all required fields');
      return;
    }
    if (this.searchForm.origin == this.searchForm.destination) {
      alert('Origin and Destination cannot be same');
      return;
    }
    if (new Date(this.searchForm.departureDate) < new Date()) {
      // Show alert for past departure date
      alert('Please select a valid departure date.');
      return;
    }
    

  
    
    
    this.SearchService.setSearchData(this.searchForm);
    
    this.router.navigate(['/flights']);
  }
  
}
