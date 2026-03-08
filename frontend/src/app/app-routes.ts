import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SauceFormComponent } from './sauce-form/sauce-form.component';
import { SauceListComponent } from './sauce-list/sauce-list.component';
import { authGuard } from './services/auth-guard.service';
import { SingleSauceComponent } from './single-sauce/single-sauce.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sauces', component: SauceListComponent, canActivate: [authGuard] },
  { path: 'sauce/:id', component: SingleSauceComponent, canActivate: [authGuard] },
  { path: 'new-sauce', component: SauceFormComponent, canActivate: [authGuard] },
  { path: 'modify-sauce/:id', component: SauceFormComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'sauces'},
  // { path: '**', redirectTo: 'sauces' }
];
