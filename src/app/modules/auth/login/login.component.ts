import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { User } from '../../../../../db';
import { AuthService } from '../../../core/services/auth.service';
import { ShAlertComponent } from '../../../shared/components/sh-alert/sh-alert.component';
import { ShButtonComponent } from '../../../shared/components/sh-button/sh-button.component';
import { ShInputComponent } from '../../../shared/components/sh-input/sh-input.component';
import { ShNotifyComponent } from '../../../shared/components/sh-notify/sh-notify.component';
import { INCORRECT_USER_NOTIFICATION } from '../../../shared/models/notify';
import { SignInForm, UserSession } from '../../../shared/models/user';
import { NotifyService } from '../../../shared/services/notify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ShInputComponent,
    ShButtonComponent,
    ShNotifyComponent,
    ShAlertComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  notifyService = inject(NotifyService);
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  formLogin!: FormGroup<SignInForm>;
  userValidationSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(): void {
    this.formLogin = this.fb.group({
      user: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  validateUserCredentials(e: Event): void {
    e.preventDefault();
    this.userValidationSubscription = this.authService
      .validateUserCredentials(
        this.formLogin.get('user')?.value!,
        this.formLogin.get('password')?.value!
      )
      .pipe(
        tap((user: User[]) =>
          user.length === 0
            ? this.notifyService.showNotification(INCORRECT_USER_NOTIFICATION)
            : this.userLogin({
                id: user[0].id || 0,
                name: user[0].name,
                user: user[0].user,
                date: new Date().toLocaleDateString(),
              })
        )
      )
      .subscribe();
  }

  userLogin(user: UserSession) {
    this.authService.saveSession(user);
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.userValidationSubscription.unsubscribe();
  }
}
