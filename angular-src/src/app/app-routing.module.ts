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
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
