import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/users/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  userForm: FormGroup;
  roles = ['ADMIN', 'Responsable','Employee']; // Fetch from API if available
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: [[]]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    
    this.userService.createUser(this.userForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard/user/usersList']),
      error: (err) => console.error('Error creating user:', err)
    });
  }

}
