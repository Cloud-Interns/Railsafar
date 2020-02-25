import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent} from './welcome/welcome.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {path:'',redirectTo : 'welcome',pathMatch: 'full'},
  {path:'welcome',component : WelcomeComponent},
  {path:'about',component : AboutComponent},
  {path:'contact-us',component : ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
