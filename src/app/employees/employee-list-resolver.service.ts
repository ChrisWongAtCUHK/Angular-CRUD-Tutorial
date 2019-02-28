import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeeList } from './resolved-employeelist.model';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';


@Injectable()
// Implement the Resolve interface, as we are implementing a route resolve guard
// Resolve interface supports generics, so specify the type of data that this
// resolver returns using the generic parameter
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList> {
    // Inject the employeee service as we need it to retrieve employee data
    constructor(private _employeeService: EmployeeService) {
    }
    // Resolve interface contains the following one method for which we need to
    // provide implementation. This method calls EmployeeService & returns employee data
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList> {
        return this._employeeService.getEmployees()
            .pipe(
                map((employeeList) => new ResolvedEmployeeList(employeeList)),
                catchError((err: any) => Observable.of(new ResolvedEmployeeList(null, err)))
            );
    }
}