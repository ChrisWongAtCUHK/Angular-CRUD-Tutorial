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
  // Use this property to stored filtered employees, so we do not
  // lose the original list and do not have to make a round trip
  // to the web server on every new search
  filteredEmployees: Employee[];

  private _searchTerm: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

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
    this.filteredEmployees = this.employees;
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId],{
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    });
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
}
