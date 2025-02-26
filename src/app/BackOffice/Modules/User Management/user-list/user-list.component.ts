import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/user-dto';
import { UserServiceService } from '../services/users/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDTO[] = [];
  filteredUsers: UserDTO[] = [];
  searchTerm = '';
  selectedRole = '';
  currentPage = 0;
  pageSize = 5;
  allRoles: string[] = ['Responsable', 'ADMIN','Employee']; // Fetch these from API if needed

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => 
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedRole ? user.roles.includes(this.selectedRole) : true)
    );
    this.currentPage = 0;
  }

  get paginatedUsers() {
    const start = this.currentPage * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
    }
  }

}
