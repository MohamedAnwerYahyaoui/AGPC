import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styleUrls: ['./dashboard-nav-bar.component.css']
})
export class DashboardNavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleDropdown(dropdownId: string): void {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
  }
}