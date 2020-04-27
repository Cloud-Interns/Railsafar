import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { ToastrService } from 'ngx-toastr';

import { ConfirmPasswordValidator } from "../../shared/confirmPassword-validator";
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loading: boolean = false;
  todayDate = new Date();
  nextDate: Date = new Date(new Date(this.todayDate).setDate(this.todayDate.getDate() - 1));
  maxDate = this.nextDate.toISOString().split('T')[0];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) { }

  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Successfully Registered!', 'Kindly Login!', {
      timeOut: 3000
    });
  }

  showWarning() {  // FOR Warnings
    this.toastr.warning('Warning', 'User already exists!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('Sorry', 'Error occured in registration!', {
      timeOut: 3000
    });
  }


  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        ]),
        confirmPassword: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required),
        phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)])
      },
      { validators: ConfirmPasswordValidator.MatchPassword }
    );
  }
  //calls a service to register a new user
  saveData(newUser) {
    this.loading = true;
    this.userService.registerUsers(newUser).subscribe(response => {
      this.loading = false;
      if (response.status === 'success') {
        this.router.navigate(["/login"]);
        this.showSuccess();
      }
      else if (response.status === 'warning') {
        this.showWarning();
      }
      else {
        this.showError();
      }
    });
  }

  onSubmit() {
    console.log("form submitted...");
    //saving user data
    const newUser = new User(
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.email,
      this.signUpForm.value.password,
      this.signUpForm.value.dob,
      this.signUpForm.value.gender,
      this.signUpForm.value.phone
    );
    this.saveData(newUser);
    this.signUpForm.reset();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

}
