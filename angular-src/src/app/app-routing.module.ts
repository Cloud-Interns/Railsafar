//Imports from Angular Framework
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components Imports
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { ContactusComponent } from './components/pages/contactus/contactus.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ForgotpasswordComponent } from './components/pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/pages/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/layouts/dashboard/dashboard.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { SearchComponent } from './components/pages/search/search.component';
import { LiveStatusComponent } from './components/pages/live-status/live-status.component';
import { BookticketComponent } from './components/pages/bookticket/bookticket.component';
import { ShowticketsComponent } from './components/pages/showtickets/showtickets.component';

//Services Imports
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:token', component: ResetpasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'show-tickets', component: ShowticketsComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookticketComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'livestatus', component: LiveStatusComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
