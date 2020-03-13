import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  constructor(private route : ActivatedRoute, private router : Router) { }

  onLogin(){
    this.router.navigate(['/login'],{relativeTo:this.route});
  }

  onRegister(){
    this.router.navigate(['/register'],{relativeTo:this.route});
  }

  ngOnInit() {
  }


}
