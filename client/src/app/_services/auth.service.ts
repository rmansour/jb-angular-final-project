import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password,
    }, httpOptions);
  };

  checkDuplicateEmailOrId(idNum: number, email: string): Observable<any> {
    return this.http.post(AUTH_API + 'checkDuplicateEmailOrId', {
      idNum,
      email
    }, httpOptions);
  };

  register(idNum: number, firstName: string, lastName: string, email: string, password: string, city: string, street: string, isAdmin: number = 0): Observable<any> {
    return this.http.post('http://localhost:8080/users/signup', {
      idNum,
      firstName,
      lastName,
      email,
      password,
      city,
      street,
      isAdmin
    }, httpOptions);
  };
}
