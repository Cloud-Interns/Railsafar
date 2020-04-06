//Imports from Angular Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Third party imports
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt"

//App Routing File
import { AppRoutingModule } from './app-routing.module';

//Components Imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutComponent } from './components/about/about.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Services Imports
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';


//Custom Directives Imports
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
    DashboardComponent

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
        //tokenGetter: tokenGetter,
        //whitelistedDomains: ["example.com"],
        //blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    })
  ],
  providers: [UserService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
