import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class TicketService {




    constructor(private http: HttpClient) {

    }

    //Book Ticket
    bookTicket(bookingDetails): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this.http
            .post("/api/ticket/bookticket", bookingDetails, { headers: headers })
            .pipe(map((response: any) => response));
    }

    //Get Tickets of logged in user
    getTickets(): Observable<any> {
        return this.http
            .get("/api/ticket/gettickets")
            .pipe(map((response: any) => response));

    }

    //Get PNR Details of logged in user
    getPnrDetails(pnrNo): Observable<any> {
        return this.http
            .get(`/api/ticket/getPnrDetails/${pnrNo}`)
            .pipe(map((response: any) => response));
    }

    //Cancel Ticket
    cancelTicket(ticketId): Observable<any> {
        return this.http
            .delete(`/api/ticket/cancelticket/${ticketId}`)
            .pipe(map((response: any) => response));
    }


}

