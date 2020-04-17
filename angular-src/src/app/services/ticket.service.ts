import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class TicketService {
    constructor(private http: HttpClient) { }

    //Book Ticket
    bookTicket(bookingDetails): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this.http
            .post("http://localhost:8000/api/ticket/bookticket", bookingDetails, { headers: headers })
            .pipe(map((response: any) => response));
    }
}