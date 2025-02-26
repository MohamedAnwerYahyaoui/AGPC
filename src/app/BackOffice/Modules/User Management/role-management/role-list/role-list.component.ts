import { Component, OnInit } from '@angular/core';
import { RoleDTO } from '../../models/role-dto';
import { RoleService } from '../../services/roles/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: RoleDTO[] = [];
  loading = true;
  errorMessage = '';

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load roles';
        this.loading = false;
      }
    });
  }

  deleteRole(roleName: string) {
    if (confirm(`Are you sure you want to delete ${roleName}?`)) {
      this.roleService.deleteRole(roleName).subscribe({
        next: () => this.loadRoles(),
        error: () => this.errorMessage = 'Failed to delete role'
      });
    }
  }

}
