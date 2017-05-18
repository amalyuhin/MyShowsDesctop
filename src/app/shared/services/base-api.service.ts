import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class BaseApiService {
  constructor(protected http: HttpService) { }

  get(method: string): Observable<Response> {
    return this.http.get(`${API_HOST}/${method}`)
  }
}
