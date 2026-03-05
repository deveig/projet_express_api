import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SauceFormComponent } from './sauce-form/sauce-form.component';
import { SauceListComponent } from './sauce-list/sauce-list.component';
import { authGuard } from './services/auth-guard.service';
import { SingleSauceComponent } from './single-sauce/single-sauce.component';

export const routes: Routes = [
  { path: 'recipe-security/signup', component: SignupComponent },
  { path: 'recipe-security/login', component: LoginComponent },
  { path: 'recipe-security/sauces', component: SauceListComponent, canActivate: [authGuard] },
  { path: 'recipe-security/sauce/:id', component: SingleSauceComponent, canActivate: [authGuard] },
  { path: 'recipe-security/new-sauce', component: SauceFormComponent, canActivate: [authGuard] },
  { path: 'recipe-security/modify-sauce/:id', component: SauceFormComponent, canActivate: [authGuard] },
  { path: 'recipe-security', pathMatch: 'full', redirectTo: 'sauces'},
  // { path: '**', redirectTo: 'sauces' }
];
