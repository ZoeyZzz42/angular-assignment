import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post('http://localhost:3000/register', user, { responseType: 'text' });
  }

}
