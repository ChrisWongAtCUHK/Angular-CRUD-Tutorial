import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { delay } from 'rxjs/internal/operators';


// The @Injectable() decorator is used to inject other dependencies
// into this service. As our service does not have any dependencies
// at the moment, we may remove the @Injectable() decorator and the
// service works exactly the same way. However, Angular recomends
// to always use @Injectable() decorator to ensures consistency
@Injectable()
export class EmployeeService {
    private listEmployees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: 'IT',
            isActive: true,
            photoPath: 'assets/images/mark.png',
            password: null,
            confirmPassword: null
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: 'HR',
            isActive: true,
            photoPath: 'assets/images/mary.png',
            password: null,
            confirmPassword: null
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: 'IT',
            isActive: false,
            photoPath: 'assets/images/john.png',
            password: null,
            confirmPassword: null
        },
    ];

    getEmployees(): Observable<Employee[]> {
        return Observable.of(this.listEmployees).pipe(delay(2000));
    }

    save(employee: Employee) {
      this.listEmployees.push(employee);
    }

    getEmployee(id: number): Employee {
      return this.listEmployees.find(e => e.id === id);
    }
}