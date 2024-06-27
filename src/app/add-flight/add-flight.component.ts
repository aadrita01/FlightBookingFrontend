import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {
  flightForm: FormGroup;
  
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.flightForm = this.fb.group({
      flightId: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      seatCapacity: [null, [Validators.required, Validators.min(1)]],
      fare: [null, [Validators.required, Validators.min(0)]]
    });
  }

  submitForm(): void {
    if (this.flightForm.valid) {
      const formData = this.flightForm.value;
      // You can now use the formData as needed (e.g., send it to the server)
      if(formData.origin==formData.destination){
        alert("Origin and Destination cannot be same");
        return;
      }
      if (formData.fare !== null) {
        // Submit fare data to a different URL or perform other actions
        const farePayload = {
          flightId: formData.flightId,
          amount: formData.fare
        };
        this.http.post('http://localhost:8001/addfare',farePayload)
          .subscribe(response => {
            console.log('Fare Form Data Submitted Successfully:',response);
          }, error => {
            console.error('Error submitting fare form data:', error);
          });
        console.log('Fare Form Data:', formData.fare);
      }
      this.http.post('http://localhost:8000/addflights', formData)
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
