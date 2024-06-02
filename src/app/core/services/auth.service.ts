import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { User, db } from '../../../../db';
import { UserSession } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  validateUserCredentials(
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

  saveSession(user: UserSession): void {
    sessionStorage.setItem('session', JSON.stringify(user));
  }

  getSession(): Observable<UserSession> {
    console.log(sessionStorage.getItem('session'));
    return of(
      JSON.parse(
        sessionStorage.getItem('session') ||
          '{"id":0,"name":"","user":"","date":""}'
      ) as UserSession
    );
  }

  clearSession(): void {
    sessionStorage.removeItem('session');
  }
}
