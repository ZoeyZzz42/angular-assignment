import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };  
  
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;

  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  onSignup(): void {
    this.userService.register(this.user).subscribe(
      response => {
        console.log('Success!', response);
        this.successMessage = 'Registration successful! Redirecting...';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error => {
        console.error('Error!', error);
        this.isLoading = false;
        this.errorMessage = error.error || 'An error occurred during registration.';
      }
    );
  }

}
