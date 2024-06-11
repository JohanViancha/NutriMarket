import { FormControl } from '@angular/forms';
import { Food } from '../../../../db';

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
  cart?: Food[];
  id: number;
  name: string;
  user: string;
  date: string;
}
