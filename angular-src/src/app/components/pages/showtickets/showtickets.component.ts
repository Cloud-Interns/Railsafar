import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-showtickets',
  templateUrl: './showtickets.component.html',
  styleUrls: ['./showtickets.component.css']
})
export class ShowticketsComponent implements OnInit {

  tickets = null;
  noOfPassengers: number = 0;
  passengersArray = null;
  loading: boolean = false;
  ticketId: string = ''
  cancelForm: FormGroup;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private toastr: ToastrService) { }

  //Toast Methods
  showSuccess() {  //FOR Success
    this.toastr.success('Success', 'Your ticket has been cancelled!', {
      timeOut: 3000
    });
  }

  showError() {   // FOR Errors 
    this.toastr.error('Sorry', 'Error occured!!', {
      timeOut: 3000
    });
  }


  ngOnInit() {
    this.cancelForm = new FormGroup({
      'ticketId': new FormControl(this.ticketId, [Validators.required])
    })

    this.ticketService.getTickets().subscribe(response => {
      this.tickets = response.tickets;
      this.passengersArray = this.tickets.map(ticket => ticket.passengerDetails);
      this.noOfPassengers = this.passengersArray[0].length;
    })
  }


  onCancelTicket() {
    this.loading = true;
    this.ticketId = this.cancelForm.value.ticketId;
    this.ticketService.cancelTicket(this.ticketId).subscribe(response => {
      this.loading = false;
      if (response.status === 'success') {
        this.showSuccess();
      } else {
        this.showError();
      }
    });
    this.cancelForm.reset();
  }

  onCancel() {
    this.router.navigate(['../show-tickets']);
  }

}
