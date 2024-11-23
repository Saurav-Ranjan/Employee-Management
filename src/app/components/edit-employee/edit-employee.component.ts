import { Component, Input } from '@angular/core';
import {EmployeeService} from '../../core/employee-service.service';
import { Employee } from 'src/app/employee.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  employee: Employee = {
    id: 0,
    name: '',
    role: '',
    fromDate: '',
    toDate: ''
  };

  roles = ['Developer', 'Manager', 'HR', 'Sales', 'Designer'];  // Example roles

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve employee ID from the route parameters
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.loadEmployeeDetails(+employeeId);  // Load employee details
    }
  }

  // Load employee details by ID
  loadEmployeeDetails(id: number): void {
    const employee = this.employeeService.getEmployeesFromStorage().find((emp: { id: number; }) => emp.id === id);
    if (employee) {
      this.employee = { ...employee };  // Pre-fill the form with existing data
    } else {
      alert('Employee not found');
      this.router.navigate(['/employee-list']);  // Navigate back if employee not found
    }
  }

  // Handle the form submission to save updated employee data
  onSubmit(): void {
    if (this.employee.name && this.employee.role && this.employee.fromDate && this.employee.toDate) {
      this.employeeService.updateEmployee(this.employee);  // Update the employee via service
      this.router.navigate(['/employee-list']);  // Navigate back to employee list
    } else {
      alert('Please fill all fields!');
    }
  }

  // Cancel editing and navigate back to employee list
  onCancel(): void {
    this.router.navigate(['/employee-list']);  // Navigate back to employee list without saving
  }
}
