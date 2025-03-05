import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RoleService } from '../services/roles/role.service';
import { UserServiceService } from '../services/users/user-service.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit, OnDestroy{

   // Core Statistics
   totalUsers = 0;
   totalRoles = 0;
 
   // Charts
   roleChart: Chart | null = null;
   activityChart: Chart | null = null;
 
   loading = true;
   errorMessage = '';
 
   constructor(
     private userService: UserServiceService,
     private roleService: RoleService
   ) {}
 
   ngOnInit() {
     this.loadData();
   }
 
   ngOnDestroy() {
     if (this.roleChart) this.roleChart.destroy();
     if (this.activityChart) this.activityChart.destroy();
   }
 
   private loadData() {
     this.userService.getAllUsers().subscribe({
       next: users => {
         this.totalUsers = users.length;
         this.createActivityChart(users);
         this.loading = false;
       },
       error: err => this.handleError(err)
     });
 
     this.roleService.getAllRoles().subscribe({
       next: roles => {
         this.totalRoles = roles.length;
         this.createRoleChart(roles);
         this.loading = false;
       },
       error: err => this.handleError(err)
     });
   }
 
   private createRoleChart(roles: any[]) {
     const canvas = document.getElementById('roleChart') as HTMLCanvasElement | null;
     if (!canvas) {
       console.error('Role chart canvas not found');
       return;
     }
 
     const ctx = canvas.getContext('2d');
     if (!ctx) {
       console.error('Could not get 2D context for role chart');
       return;
     }
 
     if (this.roleChart) this.roleChart.destroy();
 
     this.roleChart = new Chart(ctx, {
       type: 'doughnut',
       data: {
         labels: roles.map(r => r.name),
         datasets: [{
           label: 'Users per Role',
           data: roles.map(r => r.usersCount || 0), // Use actual data if available
           backgroundColor: [
             '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'
           ],
           hoverOffset: 4
         }]
       },
       options: {
         responsive: true,
         plugins: {
           legend: {
             position: 'right'
           }
         }
       }
     });
   }
 
   private createActivityChart(users: any[]) {
     const canvas = document.getElementById('activityChart') as HTMLCanvasElement | null;
     if (!canvas) {
       console.error('Activity chart canvas not found');
       return;
     }
 
     const ctx = canvas.getContext('2d');
     if (!ctx) {
       console.error('Could not get 2D context for activity chart');
       return;
     }
 
     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
     
     // Mock registration data (replace with actual timestamps)
     const registrationData = new Array(12).fill(0);
     users.forEach(user => {
       const month = new Date().getMonth(); // Replace with actual date
       registrationData[month]++;
     });
 
     if (this.activityChart) this.activityChart.destroy();
 
     this.activityChart = new Chart(ctx, {
       type: 'bar',
       data: {
         labels: months,
         datasets: [{
           label: 'User Registrations',
           data: registrationData,
           backgroundColor: '#3B82F660',
           borderColor: '#3B82F6',
           borderWidth: 2
         }]
       },
       options: {
         responsive: true,
         scales: {
           y: {
             beginAtZero: true,
             ticks: {
               stepSize: 1
             }
           }
         }
       }
     });
   }
 
   private handleError(error: any) {
     this.errorMessage = 'Failed to load dashboard data';
     this.loading = false;
     console.error(error);
   }
}
