import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seat-avl',
  templateUrl: './seat-avl.component.html',
  styleUrls: ['./seat-avl.component.css']
})
export class SeatAvlComponent implements OnInit {
  trainNo: string = '';
  AvlForm: FormGroup;
  loading: boolean = false;
  trainSeat: string;
  Data: any;
  data2: any;

  constructor(
    private router: Router) { }


  ngOnInit(): void {
    this.AvlForm = new FormGroup({
      'trainNo': new FormControl(null, [Validators.required]),
    })
  }
  onSubmit() {
    let x = (<HTMLInputElement>document.getElementById("trainNo")).value;
    this.Data = require('src/assets/JsonDataFiles/availability.json');
    this.trainSeat = this.Data.filter(d => d.number === x);
    // console.log(this.trainSeat)
  }

  onClear() {
    this.AvlForm.reset();
    this.trainSeat = null;
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }

}




