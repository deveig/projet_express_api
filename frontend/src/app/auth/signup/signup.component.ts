import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
