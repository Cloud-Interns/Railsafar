import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails = null;
  updateForm: FormGroup;
  loading: boolean = false;
  newEmail;
  newPhone;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Success!!', 'Updated Successfully!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('OOPS!!', 'Something went wrong...', {
      timeOut: 3000
    });
  }

  ngOnInit() {

    this.userService.getUserDetails().subscribe(response => {
      //If errors
      if (response.msg === 'error') {
        this.showError();
      } else {
        //get details of logged in user
        this.userDetails = response.user;
      }
    });

    this.updateForm = new FormGroup({
      'newEmail': new FormControl(null, Validators.email),
      'newPhone': new FormControl(null, Validators.pattern(/^[0-9]{10}$/))
    })
  }

  onSubmit() {
    this.loading = true;
    this.userService.updateProfile(this.updateForm.value.newEmail, this.updateForm.value.newPhone).subscribe(response => {
      this.loading = false;
      response.status === 'success' ? this.showSuccess() : this.showError();
    });
    this.updateForm.reset();
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }

}
