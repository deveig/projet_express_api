import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, shareReplay, take, tap } from 'rxjs';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  let isAuth$: Observable<boolean>;
  const auth = inject(AuthService);
  isAuth$ = auth.isAuth$.pipe(shareReplay(1));
  if (isAuth$) {
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + auth.getToken()),
    });
    return next(newRequest);
  }
  return next(req);
};
