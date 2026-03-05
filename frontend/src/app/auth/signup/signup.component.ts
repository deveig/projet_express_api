import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { catchError, EMPTY, finalize, NEVER, of, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [ReactiveFormsModule],//MatProgressSpinnerModule, MatButtonModule,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
  
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  loading = signal<boolean>(false);
  errorMsg!: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading.set(true);
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    this.auth.createUser(email, password).pipe(
      switchMap(() => this.auth.loginUser(email, password)),
      tap(() => {
        this.loading.set(false);
        this.router.navigate(['recipe-security/sauces']);
      }),
      catchError((error) => {
        this.loading.set(false);
        this.errorMsg = error;
        return EMPTY;
      })
    ).subscribe();
  }

}
