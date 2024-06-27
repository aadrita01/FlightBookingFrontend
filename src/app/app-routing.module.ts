import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchComponent } from './search/search.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { WebCheckinComponent } from './web-checkin/web-checkin.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { UpdateFlightComponent } from './update-flight/update-flight.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'search', component: SearchComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'book', component: BookingComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'confirm', component: ConfirmPageComponent},
  { path: 'webcheckin', component: WebCheckinComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'addFlight', component: AddFlightComponent},
  { path: 'deleteFlight', component: DeleteFlightComponent},
  { path: 'updateFlight', component: UpdateFlightComponent}


  // add more routes here
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
