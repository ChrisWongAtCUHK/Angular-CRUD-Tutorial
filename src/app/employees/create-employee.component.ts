import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';

// Import BsDatepickerConfig type. This is the Config object for datepicker. Using this
// config object we can set minDate, maxDate, whether to show/hide week numbers and
// change the color theme using the containerClass property.
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  // create a property of type Partial<BsDatepickerConfig>
  datePickerConfig: Partial<BsDatepickerConfig>;

  name: string;
  email: string;
  phoneNumber: string;
  contactPreference: string;
  gender: string;
  isActive: boolean;
  department: Department;
  dateOfBirth: string;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  previewPhoto = false;
  photoPath: string;
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: '',
    dateOfBirth: null,
    department: '-101',
    isActive: null,
    photoPath: null,
    password: null,
    confirmPassword: null
  };

  constructor(private _employeeService: EmployeeService, private _router: Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false
      });
  }

  ngOnInit() {
  }

  saveEmployee(): void {
    this.employee.department = JSON.parse(JSON.stringify(this.employee.department)).name;
    this._employeeService.save(this.employee);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
}
