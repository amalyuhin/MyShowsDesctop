import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
let  request = require('request');


@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(login: string, password: string): Observable<any> {
    let passHash = Md5.hashStr(password);
    let url = `http://api.myshows.ru/profile/login?login=${login}&password=${passHash}`;

    return this
      .http
      .get(url);
  }
}
