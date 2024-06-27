import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrl: './delete-flight.component.css'
})
export class DeleteFlightComponent {
  flightIdForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.flightIdForm = this.fb.group({
      flightId: ['', Validators.required],
    });
  }

  deleteFlight(): void {
    if (this.flightIdForm.valid) {
      const flightId = this.flightIdForm.value.flightId;
      // Add logic for deleting the flight using the flightId
      this.http.delete(`http://localhost:8000/deleteflights/${flightId}`)
          .subscribe(response => {
            alert('Deleted flight successfully');
            console.log('Flight Data Deleted Successfully:',response);
          }, error => {
            console.error('Error deleting flight data', error);
            alert("Flight Id not available")
          });
          this.http.delete(`http://localhost:8001/deletefare/${flightId}`)
          .subscribe(response => {
            console.log('Flight Fare Deleted Successfully:',response);
          }, error => {
            console.error('Error deleting flight fare', error);
          });    
      console.log('Deleting flight with ID:', flightId);
    } else {
      // Handle form validation errors
      alert('Please fill in the flight ID field.');
    }
  }
}
