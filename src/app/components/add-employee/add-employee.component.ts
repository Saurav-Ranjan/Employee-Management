import { Component } from '@angular/core';
import {EmployeeService} from '../../core/employee-service.service';``
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  
  roles = ['Product Designer', 'Flutter Developer', 'QA Tester ', 'Product Owner'];
  employee: Employee = {
    id:0,
    name: '',
    role: '',
    fromDate: '',
    toDate: ''
  };
  constructor(private employeeService: EmployeeService,private router: Router) {
   
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newEmployee: Employee = {
        id: 1, // Generate ID programmatically
        name: form.value.name,
        role: form.value.role,
        fromDate: form.value.fromDate,
        toDate: form.value.toDate
      };
  
      this.employeeService.saveEmployee(newEmployee);
      this.router.navigate([''])
    } else {
      alert('Please fill out all the fields.');
    }
  }



  cancel() {
    // Reset form or navigate back
  }

  

}

