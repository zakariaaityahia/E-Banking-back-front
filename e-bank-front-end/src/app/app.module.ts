import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavBarComponent} from './modules/application/components/nav-bar/nav-bar.component';
import {IndexCustomerComponent} from './modules/customer/views/index-customer/index-customer.component';
import {AddCustomerComponent} from './modules/customer/views/add-customer/add-customer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IndexAccountComponent } from './modules/account/views/index-account/index-account.component';
import { DetailsAccountComponent } from './modules/account/views/details-account/details-account.component';
import { LoginComponent } from "./modules/login/login.component";
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IndexCustomerComponent,
    AddCustomerComponent,
    IndexAccountComponent,
    DetailsAccountComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
