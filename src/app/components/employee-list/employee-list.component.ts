import { Component } from '@angular/core';
import {EmployeeService} from '../../core/employee-service.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  constructor(public employeeService: EmployeeService , private router:Router) {}
  employees: Employee[] = [];
  activeRow: number | null = null;

  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];

  ngOnInit(): void {
    // Fetch employees from the service
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      this.categorizeEmployees();
    });
  }

  // Categorize employees into current and previous based on date
  categorizeEmployees(): void {
    const currentDate = new Date();

    // Filter current and previous employees based on fromDate and toDate
    this.currentEmployees = this.employees.filter(employee => {
      const fromDate = new Date(employee.fromDate);
      const toDate = new Date(employee.toDate);
      return fromDate <= currentDate && toDate >= currentDate;
    });

    this.previousEmployees = this.employees.filter(employee => {
      const toDate = new Date(employee.toDate);
      return toDate < currentDate;
    });
  }

  setActiveRow(id: number) {
    this.activeRow = id; // Show delete icon for the selected row
  }

  clearActiveRow() {
    this.activeRow = null; // Hide delete icon when the swipe ends
  }

  // Handle delete employee
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);  // Delete employee from storage and UI
    this.categorizeEmployees(); // Re-categorize after deletion
  }

  // Navigate to Add Employee form (add navigation logic if required)
  navigateToAddEmployee(): void {
    this.router.navigate(['/add']);
  }
}


