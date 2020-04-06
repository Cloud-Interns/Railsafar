import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string = '';
  private password: string = '';
  loginForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService) { }

  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Welcome!!', 'Login Sucessfull!', {
      timeOut: 3000
    });
  }

  showWarning() {  //FOR Warnings
    this.toastr.warning('Warning', 'Please verify your email first!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('Sorry', 'Invalid Credentials!', {
      timeOut: 3000
    });
  }


  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.password, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
    })
  }

  onSubmit() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.authenticateUser(this.email, this.password);
    this.loginForm.reset();
  }

  authenticateUser(email: string, password: string) {
    this.userService.authenticateUser(email, password).subscribe(response => {

      //If Login issuccessfull goto dashboard
      if (response.status === 'success') {
        this.showSuccess();
        localStorage.setItem('currentUser', JSON.stringify(response.token));
        this.router.navigate(['../dashboard'], { relativeTo: this.route })
      }
      //Else display errors or warnings
      else if (response.status === 'error') {
        this.showError();
      }
      else if (response.status === 'warning') {
        this.showWarning();
      }

    });;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });

  }
}
