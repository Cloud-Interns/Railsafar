import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userDetails = {};

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserDetails().subscribe(response => {
      this.userDetails = response.user;
      console.log(this.userDetails);
    });

  }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/welcome']);

  }

}
