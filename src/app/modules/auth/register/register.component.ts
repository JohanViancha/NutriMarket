import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../../../../../db';
import { AuthService } from '../../../core/services/auth.service';
import { ShAlertComponent } from '../../../shared/components/sh-alert/sh-alert.component';
import { ShButtonComponent } from '../../../shared/components/sh-button/sh-button.component';
import { ShInputComponent } from '../../../shared/components/sh-input/sh-input.component';
import { USER_REGISTER_NOTIFICATION } from '../../../shared/models/notify';
import { SignOnForm } from '../../../shared/models/user';
import { NotifyService } from '../../../shared/services/notify.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ShInputComponent,
    ShButtonComponent,
    ShAlertComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthService);
  notifyService = inject(NotifyService);

  fb = inject(FormBuilder);
  formRegister!: FormGroup<SignOnForm>;

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.formRegister = this.fb.group({
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  register(e: Event) {
    e.preventDefault();
    let user: User = {
      name: this.formRegister.get('name')?.value || '',
      user: this.formRegister.get('user')?.value || '',
      password: this.formRegister.get('password')?.value || '',
    };

    this.authService
      .register(user)
      .pipe(
        tap((id: number) => {
          if (id) {
            this.notifyService.showNotification(USER_REGISTER_NOTIFICATION);
            this.formRegister.reset();
          }
        })
      )
      .subscribe(console.log);
  }
}
