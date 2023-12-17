import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

 
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      data => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }

  deleteSelectedUsers() {
    const selectedUserIds = this.users.filter(user => user.selected).map(user => user.id);
    const deleteRequests = selectedUserIds.map(userId => this.userService.deleteUser(userId));
    forkJoin(deleteRequests).subscribe(
      () => {
        this.loadUsers();
      },
      error => {
        console.error('Error deleting users', error);
      }
    );
  }

  updateUser(user: any) {
    // Logic to update user
  }
}

