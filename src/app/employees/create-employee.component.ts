import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';

// Import BsDatepickerConfig type. This is the Config object for datepicker. Using this
// config object we can set minDate, maxDate, whether to show/hide week numbers and
// change the color theme using the containerClass property.
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  employee: Employee;
  panelTitle: string;

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false
      });
  }

  // Subscribe to route parameter changes and react accordingly
  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  saveEmployee(): void {
    const newEmployee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee).subscribe(
      (data: Employee) => {
        // log the employee object after the post is completed
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => { console.log(error); }
    );
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  private getEmployee(id: number) {
    // If the id is 0, we want to create a new employee. So we intialise the employee 
    // property with an Employee object with all properties set to null. The template 
    // is bound to this employee property so all the form fields are displayed blank, 
    // to enter details of a new employee we want to create
    if (id === 0) {
      this.employee = {
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
      // Resetting the form, resets any previous validation errors
      this.createEmployeeForm.reset();
      this.panelTitle = 'Create Employee';
    } else {
      // If the Id is not 0, then retrieve the respective employee using the employee 
      // service. Copy the values into a new object and assign that object as the value 
      // for the employee property. Otherwise the employee property holds a reference 
      // to the employee object in the array in the EmployeeService. This means any 
      // changes we make on the form are automatically saved, without we explicitly
      // saving by clicking the Save button.
      this.employee = Object.assign({}, this._employeeService.getEmployee(id));
      this.panelTitle = 'Edit Employee';
    }
  }
}
