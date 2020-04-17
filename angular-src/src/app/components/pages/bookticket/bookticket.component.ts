import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css']
})
export class BookticketComponent implements OnInit {

  bookingForm: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private toastr: ToastrService) { }

  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Booked Successfully!!', 'Please check your email inbox!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('Sorry', 'Error occured in booking!', {
      timeOut: 3000
    });
  }

  ngOnInit() {
    let passengerDetails = new FormArray([]);

    this.bookingForm = new FormGroup({
      'sourceName': new FormControl(null, Validators.required),
      'destinationName': new FormControl(null, Validators.required),
      'doj': new FormControl(null, Validators.required),
      'train': new FormControl(null, Validators.required),
      'className': new FormControl(null, Validators.required),
      'passenger': passengerDetails
    })
  }

  //Submitting form
  onSubmit() {
    //console.log(this.bookingForm.value)
    this.loading = true;
    this.ticketService.bookTicket(this.bookingForm.value).subscribe(response => {
      this.loading = false;
      if (response.status === 'success') {
        this.showSuccess();
      } else {
        this.showError();
      }
    });
    this.bookingForm.reset();
  }

  //Add passenger(form)
  onAddPassenger() {
    (<FormArray>this.bookingForm.get('passenger')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'age': new FormControl(null,
          [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'gender': new FormControl(null, Validators.required),
        'food': new FormControl(null, Validators.required),
      })
    )
  }

  //Delete Passenger(form)
  onDeletePassenger(index: number) {
    (<FormArray>this.bookingForm.get('passenger')).removeAt(index);
  }

  //Clear  button
  onClear() {
    this.bookingForm.reset();
  }

  //Cancel Button
  onCancel() {
    this.router.navigate(["/dashboard"]);
  }


}
