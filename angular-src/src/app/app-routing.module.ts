//Angular Core Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components Imports
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
  { path: 'resetpassword/:id', component: ResetpasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
