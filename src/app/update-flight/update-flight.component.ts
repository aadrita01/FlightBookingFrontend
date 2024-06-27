import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrl: './update-flight.component.css'
})
export class UpdateFlightComponent {
  flightIdForm: FormGroup;
  flightDataForm: FormGroup;
  flightData: any;
  fare: any;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.flightIdForm = this.fb.group({
      flightId: ['', Validators.required],
    });

    this.flightDataForm = this.fb.group({
      flightId: [''],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      seatCapacity: [null, [Validators.required, Validators.min(1)]],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  getFlight(): void {
    if (this.flightIdForm.valid) {
      const flightId = this.flightIdForm.value.flightId;
      this.http.get<any>(`http://localhost:8000/getflights/${flightId}`)
        .subscribe((response: any) => {
          // Pre-fill the flightDataForm with the received data
          this.flightDataForm.patchValue(response);
        }, error => {
          console.error('Error retrieving flight information:', error);
          alert("Flight Id not available")
        });

      this.http.get<any>(`http://localhost:8001/getfare/${flightId}`)
        .subscribe((fareResponse: any) => {

          this.flightDataForm.patchValue({
            amount: fareResponse
          });
        }, error => {
          console.error('Error retrieving fare information:', error);
        });

      console.log('Getting flight with ID:', flightId);
    } else {
      alert('Please fill in the flight ID field.');
    }
  }

  updateFlight(): void {
    if (this.flightDataForm.valid) {
      const formData = this.flightDataForm.value;
      // You can now use the formData as needed (e.g., send it to the server)
      if (formData.amount !== null) {
        const farePayload = {
          flightId: this.flightIdForm.value.flightId,
          amount: formData.amount
        };
        this.http.put(`http://localhost:8001/updatefare/${this.flightIdForm.value.flightId}`, farePayload)
          .subscribe(response => {
            console.log('Fare Form Data Submitted Successfully:', response);
          }, error => {
            console.error('Error submitting fare form data:', error);
          });
        console.log('Fare Form Data:', formData.fare);
      }
      this.http.put(`http://localhost:8000/updateflights/${this.flightIdForm.value.flightId}`, formData)
        .subscribe(response => {
          console.log('Flight Form Data Submitted Successfully:', response);
          alert('Flight Form Data Submitted Successfully');
        }, error => {
          console.error('Error submitting flight form data:', error);
        });
      console.log(formData);
    } else {
      // Handle form validation errors
      alert('Please fill in all required fields.');
    }
  }
}
