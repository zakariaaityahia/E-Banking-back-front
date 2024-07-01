import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexCustomerComponent} from './modules/customer/views/index-customer/index-customer.component';
import {AddCustomerComponent} from "./modules/customer/views/add-customer/add-customer.component";
import {IndexAccountComponent} from "./modules/account/views/index-account/index-account.component";
import {DetailsAccountComponent} from "./modules/account/views/details-account/details-account.component";

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'customers' },
  { path: 'customers', component: IndexCustomerComponent },
  { path: 'new-customer', component: AddCustomerComponent },
  { path: 'accounts', component: IndexAccountComponent },
  { path: 'accounts/:id', component: DetailsAccountComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
