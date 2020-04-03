import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

import { ConfirmPasswordValidator } from "../shared/confirmPassword-validator";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: false }) toastContainer: ToastContainerDirective;

  message: String = '';
  displayAlert: Boolean = false;
  alertType: String = '';
  signUpForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!', {
      timeOut: 5000
    });
  }

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
    this.signUpForm = new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
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

  // onClick() {
  //   this.toastr.success('in div');
  // }

  //calls a service to register a new user
  saveData(newUser) {
    this.userService.registerUsers(newUser).subscribe(response => {
      this.toastr.success('in div');
      //this.showSuccess();
      // this.message = response.msg;
      // this.displayAlert = true;
      // this.alertType = response.type;
      // if (this.alertType === 'warning') {
      //   this.router.navigate(["../login"], { relativeTo: this.route });
      // }
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
