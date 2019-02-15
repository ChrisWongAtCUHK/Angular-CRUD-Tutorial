import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  // Parent component will use this Input property to pass
  // the employee object to which the template binds to
  @Input() employee: Employee;

  constructor() { }

  ngOnInit() {
  }

}
