import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from '../shared/confirmPassword-validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;
  message: string;
  displayAlert: Boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      ]),
      confirmPassword: new FormControl(null, Validators.required),
    }, { validators: ConfirmPasswordValidator.MatchPassword }
    );
  }

  onSubmit() {
    const newPassword = this.resetForm.value.password;
    const id = this.route.queryParams; //not working

    //calling method in user service to call API to change password
    this.userService.resetPassword(newPassword, id).subscribe(response => {
      this.displayAlert = true;
      this.message = response.msg;
    })
    this.resetForm.reset();

  }

  onLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

}
