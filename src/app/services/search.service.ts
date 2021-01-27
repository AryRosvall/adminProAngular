import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getUsers } from '../interfaces/get-users';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  get getToken() {
    return localStorage.getItem('token') || ''
  }

  get headers(): {} {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-token': this.getToken
      }
    }
  }

  transformUsers(results: any[]): User[] {
    return results.map(user => new User(user.name, user.email, user.google, user.role, user.uid, user.img, ''))
  }
  search(type: 'users' | 'doctors' | 'hospitals', searchValue: string = '') {
    return this.http.get<any[]>(`${base_url}/all/collection/${type}/${searchValue}`, this.headers)
      .pipe(
        map((resp: any) => {

          switch (type) {
            case 'users':
              return this.transformUsers(resp.results)
            default:
              return []
          }
          return resp.results
        })
      )
  }
}
