import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
// Import EmployeeService
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  selectedEmployeeId: number;
  // Inject EmployeeService using the constructor
  // The private variable _employeeService which points to
  // EmployeeService singelton instance is then available
  // throughout the class and can be accessed using this keyword
  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) { }

  // Call the getEmployees() service method of EmployeeService
  // using the private variable _employeeService
  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId]);
  }
}
