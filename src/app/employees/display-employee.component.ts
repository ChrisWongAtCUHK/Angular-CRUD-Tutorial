import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnChanges {
  // Parent component will use this Input property to pass
  // the employee object to which the template binds to
  @Input() employee: Employee;

  constructor() { }

  // This life cycle hook receives SimpleChanges as an Input parameter
  // We can use it to retrieve previous and current values as shown below
  ngOnChanges(changes: SimpleChanges) {
    const previousEmployee = <Employee>changes.employee.previousValue;
    const currentEmployee = <Employee>changes.employee.currentValue;

    console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL'));
    console.log('Current : ' + currentEmployee.name);
  }
}
