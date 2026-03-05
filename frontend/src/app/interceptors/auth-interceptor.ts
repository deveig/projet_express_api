import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const auth = inject(AuthService);
  const token = localStorage.getItem('token');
  if(token){
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + JSON.parse(token!))
    });
    return next(newRequest);
  } else {
    return next(req)
  }
} 