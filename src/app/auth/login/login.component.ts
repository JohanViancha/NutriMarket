import { Component, OnInit, inject } from '@angular/core';
import { ShInputComponent } from '../../shared/components/sh-input/sh-input.component';
import { ShButtonComponent } from '../../shared/components/sh-button/sh-button.component';
import { ShNotifyComponent } from '../../shared/components/sh-notify/sh-notify.component';
import { NotifyService } from '../../shared/services/notify.service';
import {
  INCORRECT_USER_NOTIFICATION,
  INCORRECT_USER_NOTIFICATIONs,
} from '../../shared/models/notify';
import { AuthService } from '../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { User } from '../../../../db';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ShInputComponent,
    ShButtonComponent,
    ShNotifyComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  notifyService = inject(NotifyService);
  router = inject(Router);
  authService = inject(AuthService);
  formLogin!: FormGroup;

  ngOnInit(): void {
    this.initialForm();
    this.authService.users$.subscribe(console.log);
  }

  initialForm() {
    this.formLogin = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(e: Event) {
    e.preventDefault();
    this.authService
      .login(
        this.formLogin.get('user')?.value,
        this.formLogin.get('password')?.value
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
