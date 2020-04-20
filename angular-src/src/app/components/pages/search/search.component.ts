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
  x: any;
  loading: boolean = false;
  userDetails = {};
  constructor(private router: Router, private toastr: ToastrService) { }

  //Toast Methods
  showError() {   // FOR Errors 
    this.toastr.error('OOPS!!', 'Something went wrong...', {
      timeOut: 3000
    });
  }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      source: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z -]+$/)
      ]),
      destination: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z -]+$/)
      ]),
      doj: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.loading = true;
    console.log(this.searchForm);
  }

  onClear() {
    this.searchForm.reset();
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }
}
