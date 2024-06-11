import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { User, db } from '../../../../db';
import { UserSession } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSession: BehaviorSubject<UserSession> =
    new BehaviorSubject<UserSession>({} as UserSession);

  userSession$ = this.userSession.asObservable();

  setUserSession(userSession: UserSession) {
    this.userSession.next(userSession);
  }

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

  register(user: User): Observable<number> {
    return from(db.users.add(user));
  }

  saveSession(user: UserSession): void {
    sessionStorage.setItem(`session`, JSON.stringify(user));
  }

  getSession(): Observable<UserSession> {
    console.log(this.userSession.value.id)
    return of(
      JSON.parse(
        sessionStorage.getItem('session') ||
          '{"id":0,"name":"","user":"","date":""}'
      ) as UserSession
    );
  }

  clearSession(): void {
    this.setUserSession({} as UserSession);
    sessionStorage.removeItem('session');
  }

  isUserLoggedIn(): boolean {
    return !!sessionStorage.getItem('session');
  }
}
