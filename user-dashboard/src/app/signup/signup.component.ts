import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  onSignup(form: any): void {
    if (form.valid) {
      console.log('Signup Data:', this.user);
    }
  }
}
