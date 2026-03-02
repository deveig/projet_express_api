import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SauceListComponent } from './sauce-list/sauce-list.component';
import { SauceFormComponent } from './sauce-form/sauce-form.component';
import { SingleSauceComponent } from './single-sauce/single-sauce.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sauces', component: SauceListComponent, canActivate: [authGuard] },
  { path: 'sauce/:id', component: SingleSauceComponent, canActivate: [authGuard] },
  { path: 'new-sauce', component: SauceFormComponent, canActivate: [authGuard] },
  { path: 'modify-sauce/:id', component: SauceFormComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'sauces'},
  { path: '**', redirectTo: 'sauces' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   providers: [AuthGuard]
// })
// export class AppRoutingModule { }
