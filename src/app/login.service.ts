import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  isLoggedIn: boolean=false;

  setIsLoggedIn(data: any){
    this.isLoggedIn=data;
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }
}
