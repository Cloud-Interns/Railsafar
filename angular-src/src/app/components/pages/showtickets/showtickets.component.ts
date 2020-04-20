import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-showtickets',
  templateUrl: './showtickets.component.html',
  styleUrls: ['./showtickets.component.css']
})
export class ShowticketsComponent implements OnInit {

  tickets = null;
  isTickets = false;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(response => {
      if (response !== null) {
        this.isTickets = true;
        this.tickets = response.tickets;
        console.log(this.tickets);
      } else {
        this.isTickets = false;
      }
    })
  }

}
