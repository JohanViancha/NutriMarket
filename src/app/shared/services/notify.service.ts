import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notify } from '../models/notify';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private notify: BehaviorSubject<Notify> = new BehaviorSubject<Notify>({
    content: { title: '', body: '' },
    hasCancelButton: false,
  });

  notify$ = this.notify.asObservable();
  isNotifyOpen$ = this.isOpen.asObservable();

  showNotification(notify: Notify) {
    this.isOpen.next(true);
    this.notify.next(notify);
  }

  hideNotification(): void {
    this.isOpen.next(false);
  }

  constructor() {}
}
