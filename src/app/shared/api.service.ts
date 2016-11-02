import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  login(login: string, password: string): Observable<any> {
    let passHash = Md5.hashStr(password);
    let url = `${API_HOST}/profile/login?login=${login}&password=${passHash}`;

    return this
      .http
      .get(url);
  }

  getProfile(): Observable<any> {
    let url = `${API_HOST}/profile/`;

    return this
      .http
      .get(url)
      .map((response: Response) => response.json());
  }

  getProfileShows(): Observable<any[]> {
    let url = `${API_HOST}/profile/shows/`;

    return this
      .http
      .get(url)
      .map((response: Response) => {
        let items = response.json();
        let result: Array<any> = [];

        Object.keys(items).forEach((key) => {
          result.push(items[key]);
        });
        
        return result;
      });
  }

  getNextEpisodes(): Observable<any> {
    let url = `${API_HOST}/profile/episodes/next/`;

    return this
      .http
      .get(url)
      .map((response: Response) => response.json());
  }
}
