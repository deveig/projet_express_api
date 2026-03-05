import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule], //MatButtonModule, MatProgressSpinnerModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = signal<boolean>(false);
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onLogin() {
    this.loading.set(true);
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.auth
      .loginUser(email, password)
      .pipe(
        tap(() => {
          this.loading.set(false);
          this.router.navigateByUrl('/sauces');
        }),
        catchError((error) => {
          this.loading.set(false);
          this.errorMsg = error;
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
