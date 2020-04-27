import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  source: string;
  searchData: any;
  x: any;
  trains: null;
  destination: string;

  constructor(
    private router: Router,
    private toastr: ToastrService) { }

  //Toast Methods
  showError() {   // FOR Errors 
    this.toastr.error('OOPS!!', 'Something went wrong...', {
      timeOut: 3000
    });
  }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      source: new FormControl(null,
        Validators.required
      ),
      destination: new FormControl(null,
        Validators.required
      )
    });
  }

  onSubmit() {
    let source = this.searchForm.value.source;
    let destination = this.searchForm.value.destination;
    this.searchData = require('src/assets/JsonDataFiles/trains.json');
    this.trains = this.searchData.filter(data => data.source === source && data.destination === destination);
  }

  onClear() {
    this.searchForm.reset();
    this.trains = null;
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }
}
