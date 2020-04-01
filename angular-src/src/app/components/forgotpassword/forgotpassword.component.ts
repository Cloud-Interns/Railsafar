import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.email = this.emailForm.value.email;
    this.userService.sendEmail(this.email).subscribe(response => {
      this.displayAlert = true;
      this.message = response.msg;
    });
    this.emailForm.reset();
  }

  onCancel() {
    this.router.navigate(['../login'], { relativeTo: this.route });

  }

}
