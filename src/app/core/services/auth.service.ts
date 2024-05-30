import { Injectable } from '@angular/core';
import { Food, User, db } from '../../../../db';
import { Observable, from } from 'rxjs';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users$ = liveQuery(() => db.users.toArray());
  constructor() {}

  login(
    userValue: string = '',
    passwordValue: string = ''
  ): Observable<User[]> {
    return from(
      db.users
        .filter(
          (user: User) =>
            user.user === userValue && user.password === passwordValue
        )
        .toArray()
    );
  }

  register(user: User) {
    return from(db.users.add(user));
  }
}
