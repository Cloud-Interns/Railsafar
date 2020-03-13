import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email : string = '';
  private password : string = '';
 

  loginForm : FormGroup;

  constructor(private route : ActivatedRoute, private router : Router) {}

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'email': new FormControl(this.email,[Validators.required,Validators.email]),
      'password': new FormControl(this.password,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
    })
  }

  onSubmit(){
    console.log("form submitted...");
    this.loginForm.reset();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo : this.route});

  }
}
