import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Account} from "../../model/account";

@Component({
  selector: 'app-index-account',
  templateUrl: './index-account.component.html',
  styleUrl: './index-account.component.css'
})
export class IndexAccountComponent implements OnInit {
  public accounts: Array<Account>
  public isLoading: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllAccount();
  }

  public getAllAccount(): void {
    this.accounts = [];
    this.isLoading = false;

    this.accountService.getAll()
      .subscribe({
        next: (accounts: Array<Account>) => {
          this.accounts = accounts;
          this.isLoading = true;
        },
        error: err => {
          console.error(err);
        }
      });
  }
}
