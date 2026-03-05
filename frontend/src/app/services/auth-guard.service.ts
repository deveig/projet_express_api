import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const auth = inject(AuthService);
  const router = inject(Router)
  // return auth.isAuth$.pipe(
  //     take(1),
  //     tap(auth => {
  return localStorage.getItem('token') ? true : router.navigate(['/login'])
  // if (!auth) {
  //   router.navigate(['/login']);
  // }
      // })
    // );
};