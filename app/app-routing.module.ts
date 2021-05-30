import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountsComponent } from './accounts/accounts.component';
import { ShowBalancesComponent } from './account-operation/ShowBalancesComponent';
import { AccountOperationsComponent } from './account-operation/AccountOperationsComponent';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'accounts',
    canActivate: [AuthGuard],
    component: AccountsComponent
  },
  {
    path: 'show-accounts',
    canActivate: [AuthGuard],
    component: ShowBalancesComponent
  },{
    path: 'account-operations',
    canActivate: [AuthGuard],
    component: AccountOperationsComponent
  },
  // { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})


export class AppRoutingModule {

}