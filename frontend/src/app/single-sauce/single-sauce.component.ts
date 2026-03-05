import { Component, OnInit, signal } from '@angular/core';
import { Sauce } from '../models/Sauce.model';
import { SaucesService } from '../services/sauces.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe],// MatProgressSprinnerModule; MatButtonModule
  selector: 'app-single-sauce',
  templateUrl: './single-sauce.component.html',
  styleUrls: ['./single-sauce.component.scss']
})
export class SingleSauceComponent implements OnInit {

  loading = signal<boolean>(false);
  sauce$ = signal<Observable<Sauce>>(of());
  userId = signal<string>("");
  likePending = signal<boolean>(false);
  liked = signal<boolean>(false);
  disliked = signal<boolean>(false);
  errorMessage = signal<string>("");

  constructor(private sauces: SaucesService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    // this.userId.set(this.auth.getUserId());
    this.userId.set(JSON.parse(localStorage.getItem('userId')!))
    this.loading.set(true);
    this.sauce$.set(this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.sauces.getSauceById(id)),
      tap(sauce => {
        this.loading.set(false);
        if (sauce.usersLiked && sauce.usersLiked.find(user => user === this.userId())) {
          this.liked.set(true);
        } else if (sauce.usersDisliked && sauce.usersDisliked.find(user => user === this.userId())) {
          this.disliked.set(true);
        }
      })
    ));
  }

  onLike() {
    if (this.disliked()) {
      return;
    }
    this.likePending.set(true);
    this.sauce$().pipe(
      take(1),
      switchMap((sauce: Sauce) => this.sauces.likeSauce(sauce.id, !this.liked()).pipe(
        tap(liked => {
          this.likePending.set(false);
          this.liked.set(liked);
        }),
        map(liked => ({ ...sauce, likes: liked ? sauce.likes + 1 : sauce.likes - 1 })),
        tap(sauce => this.sauce$.set(of(sauce)))
      )),
    ).subscribe();
  }

  onDislike() {
    if (this.liked()) {
      return;
    }
    this.likePending.set(true);
    this.sauce$().pipe(
      take(1),
      switchMap((sauce: Sauce) => this.sauces.dislikeSauce(sauce.id, !this.disliked()).pipe(
        tap(disliked => {
          this.likePending.set(false);
          this.disliked.set(disliked);
        }),
        map(disliked => ({ ...sauce, dislikes: disliked ? sauce.dislikes + 1 : sauce.dislikes - 1 })),
        tap(sauce => this.sauce$.set(of(sauce)))
      )),
    ).subscribe();
  }

  onBack() {
    this.router.navigate(['/sauces']);
  }

  onModify() {
    this.sauce$().pipe(
      take(1),
      tap(sauce => this.router.navigate(['/modify-sauce', sauce.id]))
    ).subscribe();
  }

  onDelete() {
    this.loading.set(true);
    this.sauce$().pipe(
      take(1),
      switchMap(sauce => this.sauces.deleteSauce(sauce.id)),
      tap(() => {
        this.loading.set(false);
        this.router.navigate(['/sauces']);
      }),
      catchError(error => {
        this.loading.set(false);
        this.errorMessage = error.message;
        console.error(error);
        return EMPTY;
      })
    ).subscribe();
  }
}
