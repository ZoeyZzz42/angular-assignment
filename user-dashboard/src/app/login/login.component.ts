import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: any): void {
    this.userService.login(this.user).subscribe(
      (response: any) => {
        this.successMessage = 'Login successful! Redirecting to dashboard...';
        localStorage.setItem('token', response.token); 
        setTimeout(() => {
          // this.router.navigate(['/dashboard']);
        }, 3000);
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      })
  }
}
