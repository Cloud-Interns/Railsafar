import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { User } from "../user.model";


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  
  //Register a new user
  registerUsers(newUser: User): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:4000/api/user/register", JSON.stringify(newUser), { headers: headers })
      .pipe(map((response: any) => response.json()));
  }
}
