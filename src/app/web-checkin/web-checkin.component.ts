import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-web-checkin',
  templateUrl: './web-checkin.component.html',
  styleUrl: './web-checkin.component.css'
})
export class WebCheckinComponent {
  // referenceId: string;
  response: any;
  referenceIdForm: FormGroup;
  

  constructor(private fb: FormBuilder,private service: SearchService,private http:HttpClient) {
    this.referenceIdForm = this.fb.group({
      referenceId: ['', Validators.required],
    });
  }
  
  submitForm() {
    if (this.referenceIdForm.valid) {
      const referenceId = this.referenceIdForm.value.referenceId;

      this.service.checkin(referenceId).subscribe(
        (resp)=>{
          this.response=resp;
        }
      );
      
      if(this.response.success==true){
      this.service.updateData(referenceId.toString()).subscribe(
        (response) => {
          // Handle the response from the backend
          console.log('Response from backend:', response);
        }
      );
      }
    }else{
      alert("Please enter empty field")
    }
  }

}
