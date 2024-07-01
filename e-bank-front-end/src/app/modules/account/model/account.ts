import {AccountOperation} from "./accountOperation";
import {Customer} from "../../customer/model/customer";

export enum AccountStatus {
  CREATED, ACTIVATED, SUSPENDED
}


export class Account {
  private _id: string;
  private _type: string;
  private _balance: number;
  private _createdAt: Date;
  private _status: AccountStatus;
  private _customer: Customer;
  private _accountOperations: Array<AccountOperation>;

  public currentPage: number;
  public totalPages: number;
  public pageSize: number;



  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
  }

  public get balance(): number {
    return this._balance;
  }
  public set balance(value: number) {
    this._balance = value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public get status(): AccountStatus {
    return this._status;
  }
  public set status(value: AccountStatus) {
    this._status = value;
  }

  public get customer(): Customer {
    return this._customer;
  }
  public set customer(value: Customer) {
    this._customer = value;
  }

  public get accountOperations(): Array<AccountOperation> {
    return this._accountOperations;
  }
  public set accountOperations(value: Array<AccountOperation>) {
    this._accountOperations = value;
  }

  public accountOperationToJson(): Array<any> {
    const accountOperations: Array<any> = [];
    if(this.accountOperations && this.accountOperations.length > 0) {
      this.accountOperations.forEach((accountOperation: AccountOperation) => {
        accountOperations.push(accountOperation);
      });
    }
    return accountOperations;
  }



  public get toJson(): any {
    return {
      id: this.id ?? null,
      balance: this.balance,
      createdAt: this.createdAt,
      status: this.status,
      customer: this.customer,
      accountOperation: this.accountOperationToJson()
    }
  }
}
