import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private firstName : string = '';
  private lastName :  string = '';
  private email : string = '';
  private password : string = '';
  private confirmPassword : string = '';
  private dob  = null;
  private gender : string = '';
  private phone : number;


  signUpForm : FormGroup;

  constructor(private router : Router, private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'firstName' : new FormControl(this.firstName,Validators.required),
      'lastName' :  new FormControl(this.lastName,Validators.required),
      'email' :     new FormControl(this.email,[Validators.required,Validators.email]),
      'password' : new FormControl(this.password,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      'confirmPassword' : new FormControl(this.confirmPassword,Validators.required),
      'dob' : new FormControl(this.dob,Validators.required),
      'gender' : new FormControl(this.gender,Validators.required),
      'phone' : new FormControl(this.phone,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
    })
  }

  // checkPasswords(control : FormControl){
  //   const password = control.value;
  //   const confirmPassword = control.value;
  //   return password === confirmPassword ? null :{notSame : true}
  // }

  onSubmit(){
    console.log("form submitted...");
    console.log(this.gender);
    this.signUpForm.reset();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo : this.route});
  }

}
