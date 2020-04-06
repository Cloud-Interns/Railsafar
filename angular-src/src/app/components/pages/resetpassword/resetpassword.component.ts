import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from '../../shared/confirmPassword-validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Success', 'Password changed successfully!', {
      timeOut: 3000
    });
  }

  showWarning() {  // FOR Warnings
    this.toastr.warning('Warning', 'No such user exists!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('Sorry', 'Error occured!!', {
      timeOut: 3000
    });
  }


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
    let id = 0;
    this.route.params.subscribe((params: Params) => {
      id = params['id'];
    });

    //calling method in user service to call API to change password
    this.userService.resetPassword(newPassword, id).subscribe(response => {
      if (response.status === 'success') {
        this.showSuccess();
      } else if (response.status === 'warning') {
        this.showWarning();
      } else {
        this.showError();
      }

    })
    this.resetForm.reset();

  }

  onLogin() {
    this.router.navigate(['../../login'], { relativeTo: this.route });
  }

}
