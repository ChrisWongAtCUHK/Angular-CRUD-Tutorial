import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Input() searchTerm: string;

  // This output event will be used to notify parent component i.e
  // ListEmployeesComponent when an employee is deleted. so the 
  // ListEmployeesComponent can delete that respective employee
  // from the filteredEmployees array to which the template is bound
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  // This property is used in the view template to show and hide
  // delete confirmation
  confirmDelete = false;

  selectedEmployeeId: number;

  panelExpanded = true;
  
  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  // Call the EmployeeService delete method and raise notifyDelete event, so 
  // the ListEemployeesComponent can delete the same employee from it's 
  // filtered list array
  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with ID = ${this.employee.id} Deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }
}
