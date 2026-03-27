import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mapTo, of, Subject, tap } from 'rxjs';
import { Sauce } from '../models/Sauce.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SaucesService {
  sauces$ = new Subject<Sauce[]>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  getSauces() {
    this.http
      .get<Sauce[]>('/security/api/sauces')
      .pipe(
        tap((sauces) => this.sauces$.next(sauces)),
        catchError((error) => {
          console.log(error);
          return of([]);
        }),
      )
      .subscribe();
  }

  getSauceById(id: string) {
    return this.http.get<Sauce>('/security/api/sauces/' + id).pipe(
      catchError((error) => {
        throw error.error.message;
      }),
    );
  }

  likeSauce(id: string, like: boolean) {
    return this.http
      .post<{
        message: string;
      }>('/security/api/sauces/' + id + '/like', { userId: this.auth.getUserId(), like: like ? 1 : 0 })
      .pipe(
        mapTo(like),
        catchError((error) => {
          throw error.error.message;
        }),
      );
  }

  dislikeSauce(id: string, dislike: boolean) {
    return this.http
      .post<{
        message: string;
      }>('/security/api/sauces/' + id + '/like', { userId: this.auth.getUserId(), like: dislike ? -1 : 0 })
      .pipe(
        map(() => dislike),
        catchError((error) => {
          throw error.error.message;
        }),
      );
  }

  createSauce(sauce: Sauce, image: File) {
    const formData = new FormData();
    formData.append('sauce', JSON.stringify(sauce));
    formData.append('image', image);
    return this.http
      .post<{ message: string }>('/security/api/sauces', formData)
      .pipe(
        catchError((error) => {
          throw error.error.message;
        }),
      );
  }

  modifySauce(id: string, sauce: Sauce, image: string | File) {
    if (typeof image === 'string') {
      return this.http
        .put<{
          message: string;
        }>('/security/api/sauces/' + id, sauce)
        .pipe(
          catchError((error) => {
            throw error.error.message;
          }),
        );
    } else {
      const formData = new FormData();
      formData.append('sauce', JSON.stringify(sauce));
      formData.append('image', image);
      return this.http
        .put<{
          message: string;
        }>('/security/api/sauces/' + id, formData)
        .pipe(
          catchError((error) => {
            throw error.error.message;
          }),
        );
    }
  }

  deleteSauce(id: string) {
    return this.http
      .delete<{ message: string }>('/security/api/sauces/' + id)
      .pipe(
        catchError((error) => {
          throw error.error.message;
        }),
      );
  }
}
