import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {ConfirmPasswordValidator} from './confirmPassword-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private UserData = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    dob : '',
    gender : '',
    phone : ''
  }


  signUpForm : FormGroup;

  constructor(private router : Router, private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'firstName' : new FormControl(null,Validators.required),
      'lastName' :  new FormControl(null,Validators.required),
      'email' :     new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      'confirmPassword' : new FormControl(null,Validators.required),
      'dob' : new FormControl(null,Validators.required),
      'gender' : new FormControl(null,Validators.required),
      'phone' : new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
    }, { validators: ConfirmPasswordValidator.MatchPassword });  
    
  }

  saveData(UserData){
    console.log(UserData);
    //calls a service to call backend API                      
  }

  onSubmit(){
    console.log("form submitted...");

    //saving user data
    this.UserData.firstName = this.signUpForm.value.firstName;
    this.UserData.lastName = this.signUpForm.value.lastName;
    this.UserData.email = this.signUpForm.value.email;
    this.UserData.password = this.signUpForm.value.password;
    this.UserData.dob = this.signUpForm.value.dob;
    this.UserData.gender = this.signUpForm.value.gender;
    this.UserData.phone = this.signUpForm.value.phone;
    this.saveData(this.UserData);
    this.signUpForm.reset();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo : this.route});
  }

}
