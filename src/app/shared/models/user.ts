import { FormControl } from '@angular/forms';

export interface SignInForm {
  user: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface SignOnForm {
  name: FormControl<string | null>;
  user: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

export interface UserSession {
  id: number;
  name: string;
  user: string;
  date: string;
}
