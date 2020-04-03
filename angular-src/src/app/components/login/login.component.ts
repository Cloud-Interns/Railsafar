import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string = '';
  private password: string = '';
  loginForm: FormGroup;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { }

  //Toast Methods
  showWarning() {  //FOR Success
    this.toastr.success('Warning!', 'Please verify your email first!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('Sorry!', 'Invalid Credentials!', {
      timeOut: 3000
    });
  }


  ngOnInit(): void {

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

      //If errors or warnings
      if (response.status === 'error') {
        this.showError();
      }
      else if (response.status === 'warning') {
        this.showWarning();
      }
      //else login is successfull store token in localstorage & his session starts for 1 hr
      else {
        console.log(response.token)
        localStorage.setItem('currentUser', JSON.stringify(response.token));
      }

    });;
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });

  }
}
