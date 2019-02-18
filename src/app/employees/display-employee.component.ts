import { Component, Input } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent {
  @Input() employee: Employee;
  getNameAndGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }
}
