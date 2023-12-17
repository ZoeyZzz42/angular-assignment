import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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

  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  onSignup(): void {
    this.userService.register(this.user).subscribe(
      response => {
        console.log('Success!', response);
        this.successMessage = 'Registration successful! Redirecting...';
        this.user = { username: '', email: '', password: '' };
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
