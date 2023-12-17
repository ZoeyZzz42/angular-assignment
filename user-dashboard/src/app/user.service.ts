import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  getAllUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

}
