import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Import HttpClient service
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

// The @Injectable() decorator is used to inject other dependencies
// into this service. As our service does not have any dependencies
// at the moment, we may remove the @Injectable() decorator and the
// service works exactly the same way. However, Angular recomends
// to always use @Injectable() decorator to ensures consistency
@Injectable()
export class EmployeeService {
    private listEmployees: Employee[];

    constructor(private httpClient: HttpClient) {
    }

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>('http://localhost:3000/employees').pipe(catchError(this.handleError));
    }

    save(employee: Employee) {
        if (employee.id === null) {
            return this.httpClient.post<Employee>('http://localhost:3000/employees',
            employee, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .pipe(catchError(this.handleError));
        } else {
            const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
            this.listEmployees[foundIndex] = employee;
        }
    }

    getEmployee(id: number): Employee {
      return this.listEmployees.find(e => e.id === id);
    }

    deleteEmployee(id: number) {
        const i = this.listEmployees.findIndex(e => e.id === id);
        if (i !== -1) {
            this.listEmployees.splice(i, 1);
        }
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        // return an observable with a meaningful error message to the end user
        return ErrorObservable.create('There is a problem with the service. We are notified & working on it. Please try again later.');
    }    
}
