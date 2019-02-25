import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FormsModule } from '@angular/forms';

import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './employees/employee.service';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';

import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';

const appRoutes: Routes = [
  { 
    path: 'list', 
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: 'create', component: CreateEmployeeComponent,  canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: 'employees/:id', component: EmployeeDetailsComponent
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
