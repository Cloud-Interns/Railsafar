import { Component, OnInit } from '@angular/core';
//import {Http,Response} from '@angular/http';
//import { map } from "rxjs/operators";

@Component({
  selector: 'app-live-status',
  templateUrl: './live-status.component.html',
  styleUrls: ['./live-status.component.css']
})
export class LiveStatusComponent implements OnInit {
  Data: any;
  arr1: any;

  constructor() { }

  ngOnInit() {
  }

  Search()
  {
      //return this.http.get(this.url).pipe(map((res:Response) => res.json())).subscribe(
        //data => {
          //console.log(data)
         // this.data = data
        //})
        let x =  (<HTMLInputElement>document.getElementById("train_number")).value;
        //this.Data = require('src/assets/TrainData.json');
        //let x1 = this.Data.Train_no;
        //console.log(x1)
        if(x)
        {
          this.Data = require('src/assets/TrainData.json');
          this.arr1 = this.Data.filter(d => d.Train_no === x)
          console.log(this.arr1)
        } 
        else
        {
          (<HTMLInputElement>document.getElementById("error")).innerHTML ="No Data Found.Please Enter Valid Train Number"
        }
  }
}
