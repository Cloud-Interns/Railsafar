import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  emailForm: FormGroup;

  message: string = '';
  displayAlert: Boolean = false;

  private email: string;


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) { }


  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Mail sent', 'Please check your inbox!', {
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
    this.emailForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.email = this.emailForm.value.email;
    this.userService.sendEmail(this.email).subscribe(response => {
      if (response.status === 'success') {
        this.showSuccess();
      } else if (response.status === 'warning') {
        this.showWarning();
      } else {
        this.showError();
      }
    });
    this.emailForm.reset();
  }

  onCancel() {
    this.router.navigate(['../login'], { relativeTo: this.route });

  }

}
