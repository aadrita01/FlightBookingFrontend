import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
 
  constructor(private http: HttpClient) {}

  searchData: any = {};
  flightId: String;
  totalCost: any;
  

  setSearchData(data: any) {
    this.searchData = { ...data };
  }

  getSearchData() {
    return { ...this.searchData };
  }

  setFlightId(data: String){
    this.flightId={...data};
  }

  getFlightId(){
    return{...this.flightId}
  }

  setTotalCost(data: any){
    this.totalCost=data;
  }

  getTotalCost(){
    return this.totalCost;
  }

  setFare(data: any){
    this.totalCost=data;
  }

  getFare(){
    return this.totalCost;
  }

  setTranId(data: any){
    this.totalCost=data;
  }

  getTranId(){
    return this.totalCost;
  }

  postData(data: string): Observable<any> {
    return this.http.post(`http://localhost:8765/booking/storeRefId/${data}`, data);
  }

  updateData(data: any): Observable<any> {
    return this.http.put(`http://localhost:8004/checkin/${data}`, data);
  }

  checkin(data: any): Observable<any> {
    return this.http.get(`http://localhost:8765/webcheckin/checkRefId/${data}`);
  }

}
