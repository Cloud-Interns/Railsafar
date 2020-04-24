import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-live-status',
  templateUrl: './live-status.component.html',
  styleUrls: ['./live-status.component.css']
})
export class LiveStatusComponent implements OnInit {

  trainNo: string = '';
  livestatusForm: FormGroup;
  liveStatus: string;
  Data: any;
  FirstData: string;

  constructor(
    private router:Router) { }

   
    ngOnInit(): void {
      this.livestatusForm = new FormGroup({
        'trainNo': new FormControl(null, [Validators.required]),
      })
    }
    onSubmit() {
      let x =  (<HTMLInputElement>document.getElementById("trainNo")).value;
      this.Data = require('src/assets/JsonDataFiles/schedule.json');
      this.liveStatus = this.Data.filter(d => d.number === x);
      this.FirstData  = this.liveStatus[0];
    }
  
    onClear() {
      this.livestatusForm.reset();
    }
  
    onBack() {
      this.router.navigate(['/dashboard']);
    }

}



