import {Component, contentChild, OnInit} from '@angular/core';
import {Account} from "../../model/account";
import {AccountService} from "../../services/account.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-details-account',
  templateUrl: './details-account.component.html',
  styleUrl: './details-account.component.css'
})
export class DetailsAccountComponent implements OnInit {
  public currentAccount: Account = new Account();
  public isLoading: boolean = false;
  public accountId: string;
  public currentPage: number = 0;
  public pageSize: number = 5;
  public formOperation: FormGroup;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService:AuthService
  ) {
    this.formOperation = this.formBuilder.group({
      operationType: null,
      amount: 0,
      description: null,
      accountDestination: null,
    });
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.accountId = params.get('id') ?? '';
      this.getAccount();
    });
  }

  public getAccount(): void {
    this.isLoading = false;

    this.accountService.getById(this.accountId, this.currentPage, this.pageSize)
      .subscribe({
        next: (account: Account) => {
          this.currentAccount = account;
          this.isLoading = true;
        }
      });
  }

  public goToPage(page: number) {
    this.isLoading = false;
    this.currentPage = page;

    this.accountService.getById(this.accountId, this.currentPage, this.pageSize)
      .subscribe({
        next: (account: Account) => {
          this.currentAccount = account;
          this.isLoading = true;
        }
      });
  }

  public saveOperation(): void {
    const values = this.formOperation.value;
    const operationType: string = values['operationType'];
    const amount: number = values['amount'];
    const description: string = values['description'];
    const accountDestination: string = values['accountDestination'];

    if(operationType == 'DEBIT') {
      this.accountService.debit(this.accountId, amount, description)
        .subscribe({
          next: (response) => {
            alert("Success Debit");
            this.formOperation.reset();
            this.getAccount();
          },
          error: err => {
            console.error(err);
          }
        });
    }
    else if(operationType == 'CREDIT') {
      this.accountService.credit(this.accountId, amount, description)
        .subscribe({
          next: (response) => {
            alert("Success Credit");
            this.formOperation.reset();
            this.getAccount();
          },
          error: err => {
            console.error(err);
          }
        });
    }
    else if(operationType == 'TRANSVER') {
      this.accountService.transfer(this.accountId, accountDestination, amount, description)
        .subscribe({
          next: (response) => {
            alert("Success Transver");
            this.formOperation.reset();
            this.getAccount();
          },
          error: err => {
            console.error(err);
          }
        });
    }
  }
}
