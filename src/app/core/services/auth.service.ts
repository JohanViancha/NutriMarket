import { Injectable } from '@angular/core';
import { User, db } from '../../../../db';
import { Observable, from } from 'rxjs';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users$ = liveQuery(() => db.users.toArray());
  constructor() {}

  login(userValue: string, passwordValue: string) {
    return from(
      db.users
        .filter(
          (user: User) =>
            user.user === userValue && user.password === passwordValue
        )
        .toArray()
    );
  }
}
