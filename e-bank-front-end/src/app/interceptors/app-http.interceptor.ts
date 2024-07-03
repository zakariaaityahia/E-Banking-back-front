import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Injectable()

export class AppHttpInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes("auth/login")) {
      let newRequest = request.clone({
        headers : request.headers.set('Authorization', 'Bearer' + this.authService.accessToken)
      })
      return next.handle(newRequest).pipe(
        catchError(err => {
          if(err.stat == 401) {
            this.authService.logout();
          }
          return throwError(err.message);
        })
      );
    }
    else  return next.handle(request)

  }

}

