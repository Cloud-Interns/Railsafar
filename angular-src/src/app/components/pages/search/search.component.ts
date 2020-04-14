import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  x: any;
  constructor() {}

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
    console.log(this.searchForm);
    // this.searchForm.reset();
  }
}
