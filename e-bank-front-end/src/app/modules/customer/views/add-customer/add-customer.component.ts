import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../model/customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  public form: FormGroup;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  public saveCustomer(): void {
    const values = this.form.value;
    const customer: Customer = new Customer();
    customer.name = values['name'];
    customer.email = values['email'];
    this.customerService.save(customer)
      .subscribe({
        next: (savedCustomer: Customer) => {
          if(savedCustomer) {
            alert('Customer Added Successfully');
            this.form.reset();
            this.router.navigateByUrl('/customers');
          }
        },
        error: err => {
          console.error(err);
        }
      });
  }

}
