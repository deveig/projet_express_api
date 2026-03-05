import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$!: Observable<boolean>;
  logged = signal<boolean>(false);

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuth$ = this.auth.isAuth$.pipe(
      shareReplay(1)
    );
  }

  onLogout() {
    this.auth.logout();
  }

}
