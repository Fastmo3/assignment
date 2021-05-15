import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/login/login.component';
import { ListerComponent } from 'src/app/lister/lister.component';
import { AdderComponent } from './adder/adder.component';
import { RegisterComponent } from './register/register.component';
import { HelperComponent } from './helper/helper.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'lister', component: ListerComponent },
  { path: 'adder', component: AdderComponent },
  { path: 'helper', component: HelperComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
