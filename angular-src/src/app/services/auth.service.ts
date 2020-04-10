import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) { }

    //Method to check whether user is logged in or NOT
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('currentUser');
        // Check whether the token is expired and return
        // true or false
        if (this.jwtHelper.isTokenExpired(token)) {
            return false;
        } else {
            return true;
        }
    }

    //Returns JWT Token stored in localstorage
    public getToken(): string {
        return localStorage.getItem('currentUser');
    }
}