import { Injectable } from '@angular/core';
import {config} from "../../../../config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Account} from "../model/account";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_URL: string = `${config.endPoint}accounts/`;

  constructor(private http: HttpClient, public authService: AuthService) { }

  public getById(id: string, page: number, size: number): Observable<Account> {
    const httpParams: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Account>(`${this.API_URL}get/${id}/pageOperations`, {
      params: httpParams
    });
  }

  public getAll(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(`${this.API_URL}index`);
  }

  public debit(accountId: string, amount: number, description: string) {
    const data={accountId : accountId, amount : amount, description : description};
    return this.http.post(`${this.API_URL}debit`, data);
  }

  public credit(accountId: string, amount: number, description: string) {
    const data={accountId : accountId, amount : amount, description : description};
    return this.http.post(`${this.API_URL}credit`, data);
  }

  public transfer(accountSource: string, accountDestination: string, amount: number, description: string) {
    const data={accountSource, accountDestination, amount, description };
    return this.http.post(`${this.API_URL}transfer`, data);
  }


}
