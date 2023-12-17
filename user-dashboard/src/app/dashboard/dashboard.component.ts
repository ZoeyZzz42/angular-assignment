import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  @ViewChild('updateForm') updateForm!: NgForm;

  constructor(private userService: UserService) {}

 
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data.map(user => ({ ...user, selected: false }));
      },
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

  selectUserForUpdate() {
    const selectedUsers = this.users.filter(user => user.selected);
    if (selectedUsers.length === 1) {
      this.selectedUser = { ...selectedUsers[0] };
    } else {
      alert("Please select exactly one user to update.");
      this.selectedUser = null;
    }
  }

  updateUser() {
    if (this.updateForm && this.updateForm.valid) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        () => {
          this.loadUsers();
          this.selectedUser = null;
        },
        error => console.error('Error updating user', error)
      );
    }
  }

  cancelUpdate() {
    this.selectedUser = null; 
  }
}

