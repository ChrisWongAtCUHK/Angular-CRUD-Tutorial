import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  // Private backing field for the property
  private _employee: Employee;

  // This property setter is called anytime the input property changes
  // Notice the code here logs the previous and current employee names
  @Input()
  set employee(val: Employee) {
    console.log('Previous : ' + (this._employee ? this._employee.name : 'NULL'));
    console.log('Current : ' + val.name);
    this._employee = val;
  }

  // This getter is called when reading and displaying data
  get employee(): Employee {
    return this._employee;
  }

  constructor() { }

  ngOnInit() {}
}
