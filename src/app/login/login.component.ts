import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { Location } from '@angular/common';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  searchForm = {
    username: '',
    password: ''
  };
  loginFailed: boolean = false;
  usernameExist: boolean = false;

  private baseUrl = 'http://localhost:8003/app';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router,
    private service: LoginService, private location: Location) { }

  isLoggedIn = this.service.getIsLoggedIn();

  login(event: Event) {
    event.preventDefault();
    if (this.searchForm.username.trim() === '' || this.searchForm.password.trim() === '') {
      // Show alert if either username or password is empty
      alert('Username or password is empty. Please fill in both fields.');
      return; // Do not proceed with login if validation fails
    }

    const body = this.searchForm;
    return this.http.post(`${this.baseUrl}/signin`, body).
      subscribe(
        (response) => {
          console.log('Login successful', response);
          this.service.setIsLoggedIn(true);
          this.showSuccessSnackbar();

          // Redirect or perform additional actions as needed
        },
        (error) => {
          // Handle login error
          console.error('Login failed', error);
          this.loginFailed = true;
          // Display error message to the user or perform other error handling
        }
      );
  }
  private showSuccessSnackbar() {
    this.snackBar.open('Login successful', 'Close', {
      duration: 5000, // Duration in milliseconds
      verticalPosition: 'top', // Position at the top
      horizontalPosition: 'center', // Center horizontally
      panelClass: ['bigger-snackbar'] // Add your custom styling class
    });
    if (this.searchForm.username == "admin") {
      this.router.navigate(['/admin'])
    } else { 
      this.location.back();
     }

  }


  navigateToSignup(event: Event) {
    event.preventDefault();
    if (this.searchForm.username.trim() === '' || this.searchForm.password.trim() === '') {
      // Show alert if either username or password is empty
      alert('Username or password is empty. Please fill in both fields.');
      return; // Do not proceed with login if validation fails
    }
    const body = this.searchForm;
    if (body.username == "admin") {
      alert("Cannot have username as admin");
      return;
    }
    this.http.get(`${this.baseUrl}/checkUsername/${body.username}`).
      subscribe(
        (response) => {
          if (response) {
            this.usernameExist = true;
          } else {
            return this.http.post(`${this.baseUrl}/signup`, body).
              subscribe(
                (response) => {
                  console.log('Signup successful', response);
                  this.service.setIsLoggedIn(true);
                  this.showSignupSnackbar();
                },
                (error) => {
                  // Handle login error
                  console.error('Signup failed', error);
                }
              );
          }
        });

  }
  private showSignupSnackbar() {
    this.snackBar.open('Signup successful', 'Close', {
      duration: 5000, // Duration in milliseconds
      verticalPosition: 'top', // Position at the top
      horizontalPosition: 'center', // Center horizontally
      panelClass: ['bigger-snackbar'] // Add your custom styling class
    });
    this.location.back();
  }

  logout() {
    this.service.setIsLoggedIn(false);
    this.router.navigate(['/'])
  }
}
