import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrl: './passenger-form.component.css'
})
export class PassengerFormComponent {
  @Input() passengerCount: number;
  passengerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.passengerForm = this.fb.group({});

    for (let i = 0; i < this.passengerCount; i++) {
      this.passengerForm.addControl(`name${i}`, this.fb.control('', Validators.required));
      this.passengerForm.addControl(`age${i}`, this.fb.control('', Validators.required));
    }
  }

  getPassengerIndices(): number[] {
    return Array.from({ length: this.passengerCount }, (_, i) => i);
  }
}
