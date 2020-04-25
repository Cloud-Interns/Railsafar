//Imports from Angular Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//Third party imports
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt"

//App Routing File
import { AppRoutingModule } from './app-routing.module';

//Components Imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactusComponent } from './components/pages/contactus/contactus.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ResetpasswordComponent } from './components/pages/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/pages/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './components/layouts/dashboard/dashboard.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { SearchComponent } from './components/pages/search/search.component';
import { LiveStatusComponent } from './components/pages/live-status/live-status.component';
import { BookticketComponent } from './components/pages/bookticket/bookticket.component';
import { ShowticketsComponent } from './components/pages/showtickets/showtickets.component';
import { PnrComponent } from './components/pages/pnr/pnr.component';
import { ProfileComponent } from './components/pages//profile/profile.component';
import { TrainScheduleComponent } from './components/pages/train-schedule/train-schedule.component';
import { SeatAvlComponent } from './components/pages/seat-avl/seat-avl.component';
import { UpdatepasswordComponent } from './components/pages/updatepassword/updatepassword.component';

//Services Imports
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { TicketService } from './services/ticket.service';
import { TokenInterceptor } from './services/token.interceptor';


//Custom Directives Imports./components/pages/profile/profile.component
import { ShPasswordDirective } from './directives/sh-password.directive';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    AboutComponent,
    ContactusComponent,
    LoginComponent,
    SignupComponent,
    ResetpasswordComponent,
    ShPasswordDirective,
    ForgotpasswordComponent,
    DashboardComponent,
    ErrorComponent,
    SearchComponent,
    LiveStatusComponent,
    BookticketComponent,
    ShowticketsComponent,
    PnrComponent,
    ProfileComponent,
    TrainScheduleComponent,
    SeatAvlComponent,
    UpdatepasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['127.0.0.1:8000']
        //blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    })
  ],
  providers: [TicketService, UserService, AuthGuardService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getToken() {
  return localStorage.getItem('currentUser');
}
