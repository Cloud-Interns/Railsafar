import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from '../../shared/confirmPassword-validator';


@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  updatePwdForm: FormGroup;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Success', 'Password updated successfully!', {
      timeOut: 3000
    });
  }

  showWarning() {  // FOR Warnings
    this.toastr.warning('Warning', 'Entered old password is incorrect!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('Sorry', 'Error occured!!', {
      timeOut: 3000
    });
  }


  ngOnInit() {
    this.updatePwdForm = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      ]),
      confirmPassword: new FormControl(null, Validators.required),
    }, { validators: ConfirmPasswordValidator.MatchPassword2 }
    );
  }

  onSubmit() {
    this.loading = true;
    const oldPassword = this.updatePwdForm.value.oldPassword;
    const newPassword = this.updatePwdForm.value.newPassword;

    //calling method in user service to call API to update password
    this.userService.updatePassword(oldPassword, newPassword).subscribe(response => {
      this.loading = false;
      if (response.status === 'success') {
        this.showSuccess();
      } else if (response.status === 'warning') {
        this.showWarning();
      } else {
        this.showError();
      }

    })
    this.updatePwdForm.reset();
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }
}
