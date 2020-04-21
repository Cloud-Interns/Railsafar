import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { }

  //Toast Methods
  showError() {   // FOR Errors 
    this.toastr.error('OOPS!!', 'Something went wrong...', {
      timeOut: 3000
    });
  }


  ngOnInit() {

  }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/welcome']);

  }

}
