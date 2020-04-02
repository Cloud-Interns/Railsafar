import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { User } from "../models/user.model";


@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  //Register a new user
  registerUsers(newUser: User): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:8000/api/user/register", newUser, { headers: headers })
      .pipe(map((response: any) => response));
  }

  //Authenticate a user
  authenticateUser(email: string, password: string): Observable<any> {
    const userDetails = {
      email,
      password
    }
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post("http://localhost:8000/api/user/login", userDetails, { headers: headers })
      .pipe(map((response: any) => response));
  }

  //Send Email containing link to reset password
  sendEmail(email: string): Observable<any> {
    const userEmail = { email };
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post("http://localhost:8000/api/user/sendemail", userEmail, { headers: headers })
      .pipe(map((response: any) => response));
  }

  //Reset User's Password
  resetPassword(newPassword: string, id: any): Observable<any> {
    console.log(id);
    console.log(newPassword);
    const password = { newPassword }
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post(`http://localhost:8000/api/user/resetpassword/${id}`, password, { headers: headers })
      .pipe(map((response: any) => response));
  }
}
