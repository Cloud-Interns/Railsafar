import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-train-schedule',
  templateUrl: './train-schedule.component.html',
  styleUrls: ['./train-schedule.component.css']
})
export class TrainScheduleComponent implements OnInit {
  trainNo: string = '';
  scheduleForm: FormGroup;
  trainSchedule: string;
  Data: any;
  FirstData: string;

  constructor(
    private router:Router) { }

   
    ngOnInit(): void {
      this.scheduleForm = new FormGroup({
        'trainNo': new FormControl(null, [Validators.required]),
      })
    }
    onSubmit() {
      let x =  (<HTMLInputElement>document.getElementById("trainNo")).value;
      this.Data = require('src/assets/JsonDataFiles/schedule.json');
      this.trainSchedule = this.Data.filter(d => d.number === x);
      this.FirstData  = this.trainSchedule[0];
      console.log(this.FirstData["name"]);
    }
  
    onClear() {
      this.scheduleForm.reset();
    }
  
    onBack() {
      this.router.navigate(['/dashboard']);
    }

}
