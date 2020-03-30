import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  resetForm: FormGroup;

  message: string = '';
  displayAlert: Boolean = false;

  private email: string;

  ngOnInit() {
    this.resetForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.email = this.resetForm.value.email;
    this.sendEmail(this.email);
    this.resetForm.reset();
  }

  sendEmail(email: string) {
    this.userService.sendEmailWithOTP(email).subscribe(response => {
      //console.log("Hello");
      this.displayAlert = true;
      this.message = response.msg;
    });

  }

  onCancel() {
    this.router.navigate(['../login'], { relativeTo: this.route });

  }

}
