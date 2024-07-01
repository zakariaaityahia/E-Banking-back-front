import { Injectable } from '@angular/core';
import { config } from '../../../../config';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Customer} from "../model/customer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_URL: string = `${config.endPoint}customers/`;

  constructor(private http: HttpClient) { }

  public save(customer: Customer): Observable<Customer> {
    if(!customer.id) {
      return this.http.post<Customer>(`${this.API_URL}save`, customer.toJson);
    }
    return this.http.post<Customer>(`${this.API_URL}save`, customer.toJson);
  }

  public get(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}get/${id}`);
  }

  public getAll(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${this.API_URL}index`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}delete/${id}`);
  }

  public searchByName(keyword: string): Observable<Array<Customer>> {
    const httpParams: HttpParams = new HttpParams()
      .set('keyword', keyword);

    return this.http.get<Array<Customer>>(`${this.API_URL}search`, {
      params: httpParams
    });
  }
}
