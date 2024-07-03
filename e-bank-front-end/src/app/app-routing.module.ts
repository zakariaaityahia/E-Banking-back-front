import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexCustomerComponent} from './modules/customer/views/index-customer/index-customer.component';
import {AddCustomerComponent} from "./modules/customer/views/add-customer/add-customer.component";
import {IndexAccountComponent} from "./modules/account/views/index-account/index-account.component";
import {DetailsAccountComponent} from "./modules/account/views/details-account/details-account.component";
import {LoginComponent} from "./modules/login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'customers' },
  { path: "", redirectTo: "/login" , pathMatch:"full"},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminTemplateComponent, canActivate : [AuthenticationGuard],
    children :[
      { path: 'customers', component: IndexCustomerComponent },
      { path: 'new-customer', component: AddCustomerComponent , canActivate: [AuthenticationGuard], data: {role: "ADMIN"}},
      { path: 'accounts', component: IndexAccountComponent },
      { path: 'accounts/:id', component: DetailsAccountComponent },
      { path: 'notAuthorized', component: NotAuthorizedComponent }

    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
