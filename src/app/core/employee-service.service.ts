import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee.model'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];  // Will hold employee data
  private employeesSubject = new BehaviorSubject<Employee[]>([]);  // Observable for employees
  private nextId = 1;  // Keep track of the next ID to assign to employees

  constructor() {
    this.loadEmployeesFromStorage(); // Load initial employee data from storage
  }

  private list = signal<Employee[]>([]);

  // Save employee to localStorage
  saveEmployee(employee: Employee): void {
    // Assign a unique ID if it's not already set
    if (!employee.id) {
      employee.id = this.nextId++;  // Assign an ID and increment for the next employee
    }
 
    // Add the employee to the list
    this.employees.push(employee);
    this.updateEmployeesInStorage(); // Update storage after adding employee
  }

  // Get all employees (Observable)
  getEmployees() {
    return this.employeesSubject.asObservable();
  }


  // Get employee by ID from storage
  getEmployeesFromStorage() {
    return JSON.parse(localStorage.getItem('employees') || '[]');
  }
  // Load employees from localStorage
  private loadEmployeesFromStorage() {
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employees = storedEmployees;

    // Set the nextId based on the last employee's ID
    if (this.employees.length > 0) {
      this.nextId = Math.max(...this.employees.map(emp => emp.id)) + 1;
    }

    this.employeesSubject.next(this.employees);
  }

  // Update existing employee
  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(employee => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;  // Update employee details
      this.updateEmployeesInStorage();
    }
  }
  // Update employees in localStorage
  private updateEmployeesInStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.employeesSubject.next(this.employees);
  }

  // Delete employee by ID
  deleteEmployee(id: number): void {
    // Filter out the employee with the given ID
    this.employees = this.employees.filter(employee => employee.id !== id);
    this.updateEmployeesInStorage();  // Update localStorage after deletion
  }
}
  