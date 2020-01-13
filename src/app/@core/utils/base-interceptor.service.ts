import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class BaseInterceptorService implements HttpInterceptor {

  constructor(private authService: NbAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      flatMap((token: NbAuthJWTToken) => {
        let mutated = req.clone();
        const SAFE_PATH = [
          '/api/user',
          '/api/login',
        ];
        if (req.url === env.server + '/api/user' && req.method.toLowerCase() === 'post') {
          mutated = mutated.clone({
            body: {
              name: req.body && req.body.fullName ? req.body.fullName : null,
              email: req.body && req.body.email ? req.body.email : null,
              password: req.body && req.body.password ? req.body.password : null,
              password_confirmation: req.body && req.body.confirmPassword ? req.body.confirmPassword : null,
              role: req.body && req.body.role ? req.body.role : 'STUDENT',
            }
          });
        }
        if (SAFE_PATH.map(v => env.server + v).includes(req.url) === false && req.method !== 'post') {
          mutated = mutated.clone({
            headers: mutated.headers.set('Authorization', `bearer ${token.getValue()}`)
          });
        }
        let handle = next.handle(mutated);
        //handle.subscribe(res => {
        //  console.log('Intercept:', { req, mutated, res });
        //});
        return handle;
      }),
    );
  }
}
