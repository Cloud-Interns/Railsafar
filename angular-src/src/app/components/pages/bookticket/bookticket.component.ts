import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isFilled: boolean = false;
  todayDate: Date = new Date();
  nextDate: Date = new Date(new Date(this.todayDate).setDate(this.todayDate.getDate() + 1));
  minDate = this.nextDate.toISOString().split('T')[0];



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

  showFatalError() {   // FOR Incomplete Form
    this.toastr.error('OOPS!!', 'Please add passenger details!', {
      timeOut: 5000
    });
  }

  showInputError() {   // FOR Input Error
    this.toastr.error('Sorry!!', 'Source & Destination cannot be same!', {
      timeOut: 5000
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
    this.bookingForm.value.sourceName === this.bookingForm.value.destinationName ? this.showInputError() :
      this.loading = true;
    this.ticketService.bookTicket(this.bookingForm.value).subscribe(response => {
      this.loading = false;
      if (response.status === 'success') {
        this.showSuccess();
      } else if (response.status === 'fatal') {
        this.showFatalError();
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
