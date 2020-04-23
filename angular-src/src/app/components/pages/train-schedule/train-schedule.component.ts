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
  loading: boolean = false;
  trainSchedule: string;
  Data: any;

  constructor(
    private router:Router) { }

   
    ngOnInit(): void {
      this.scheduleForm = new FormGroup({
        'trainNo': new FormControl(null, [Validators.required]),
      })
    }
    onSubmit() {
      let x =  (<HTMLInputElement>document.getElementById("trainNo")).value;
      this.Data = require('src/assets/JsonDataFiles/getschedule.json');
      this.trainSchedule = this.Data.filter(d => d.trainNo === x);
      console.log(this.trainSchedule);
    }
  
    onClear() {
      this.scheduleForm.reset();
    }
  
    onBack() {
      this.router.navigate(['/dashboard']);
    }

}
