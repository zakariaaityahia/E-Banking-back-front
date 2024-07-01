import {Component, OnInit} from '@angular/core';
import { Customer } from '../../model/customer';
import {CustomerService} from "../../services/customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-index-customer',
  templateUrl: './index-customer.component.html',
  styleUrl: './index-customer.component.css'
})
export class IndexCustomerComponent implements OnInit{
  public customers: Array<Customer> = [];
  public isLoading: boolean = false;
  public form: FormGroup;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      keyword: [null]
    });

    this.form.valueChanges.subscribe({
      next: values => {
       const keyword: string = values['keyword'];
       if(keyword != '') {
         this.handleSearchCustomers(keyword);
       }
       else {
         this.getAllCustomer();
       }
      }
    });
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  public getAllCustomer(): void {
    this.customers = [];
    this.isLoading = false;

    this.customerService.getAll()
      .subscribe({
        next: (customers: Array<Customer>) => {
          if(customers) {
            customers.forEach((customer: Customer) => {
              this.customers.push(customer);
            });
            this.isLoading = true;
          }
        },
        error: err => {
          console.error(err);
        }
      });
  }

  public handleSearchCustomers(keyword: string): void {
    this.customerService.searchByName(keyword)
      .subscribe({
        next: (customers: Array<Customer>) => {
          if(customers) {
            this.customers = customers;
          }
        },
        error: err => {
          console.error(err);
        }
      });
  }

  public deleteCustomer(customer: Customer): void {
    if(confirm("Are you sure?")) {
      this.customerService.delete(customer.id)
        .subscribe({
          next: () => {
            this.customers.splice(this.customers.indexOf(customer), 1);
          },
          error: err => {
            console.error(err);
          }
        });
    }
  }
}
