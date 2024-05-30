import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../../../../db';
import { AuthService } from '../../core/services/auth.service';
import { ShButtonComponent } from '../../shared/components/sh-button/sh-button.component';
import { ShInputComponent } from '../../shared/components/sh-input/sh-input.component';
import { ShNotifyComponent } from '../../shared/components/sh-notify/sh-notify.component';
import { INCORRECT_USER_NOTIFICATION } from '../../shared/models/notify';
import { SignInForm } from '../../shared/models/user';
import { NotifyService } from '../../shared/services/notify.service';
import { ShAlertComponent } from '../../shared/components/sh-alert/sh-alert.component';

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
export class LoginComponent implements OnInit {
  notifyService = inject(NotifyService);
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  formLogin!: FormGroup<SignInForm>;

  ngOnInit(): void {
    this.initialForm();
    this.authService.users$.subscribe(console.log);
  }

  initialForm(): void {
    this.formLogin = this.fb.group({
      user: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  login(e: Event): void {
    e.preventDefault();
    this.authService
      .login(
        this.formLogin.get('user')?.value!,
        this.formLogin.get('password')?.value!
      )
      .pipe(
        tap((user: User[]) =>
          user.length === 0
            ? this.notifyService.showNotification(INCORRECT_USER_NOTIFICATION)
            : this.router.navigate(['.'])
        )
      )
      .subscribe();
  }
}
