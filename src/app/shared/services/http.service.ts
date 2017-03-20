import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService extends Http {
  constructor(backend: XHRBackend, options: RequestOptions, private _router: Router) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    return super
      .request(url, options)
      .catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HttpService) {
    return (res: Response) => {
      if (res.status === 401) {
        localStorage.removeItem('profile');
        this._router.navigate(['/login']);
      }

      return Observable.throw(res);
    };
  }
}
