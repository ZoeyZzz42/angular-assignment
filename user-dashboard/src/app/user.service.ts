import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user, { responseType: 'text' });
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

}
