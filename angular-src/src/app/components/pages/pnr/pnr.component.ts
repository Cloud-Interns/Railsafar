import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TicketService } from '../../../services/ticket.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pnr',
  templateUrl: './pnr.component.html',
  styleUrls: ['./pnr.component.css']
})
export class PnrComponent implements OnInit {

  pnrNo: string = '';
  pnrForm: FormGroup;
  pnrDetails = null;
  loading: boolean = false;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private ticketService: TicketService) { }

  //Toast Methods  
  showError() {   // FOR Errors 
    this.toastr.error('Sorry', 'Please check PNR Number!', {
      timeOut: 3000
    });
  }


  ngOnInit(): void {
    this.pnrForm = new FormGroup({
      'pnrNo': new FormControl(this.pnrNo, [Validators.required]),
    })
  }

  onSubmit() {
    this.loading = true;
    this.ticketService.getPnrDetails(this.pnrForm.value.pnrNo).subscribe(response => {
      this.loading = false;
      if (response.status === 'success') {
        this.pnrDetails = response.pnrDetails;
      } else {
        this.showError();
      }
    })
    this.pnrForm.reset();
  }

  onClear() {
    this.pnrForm.reset();
    this.pnrDetails = null;
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }
}
