import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notify } from '../models/notifiy/notify.interfaces';
import { Command } from '../models/notifiy/command.interfaces';

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
  private command: Command | null = null;

  notify$ = this.notify.asObservable();
  isNotifyOpen$ = this.isOpen.asObservable();

  showNotification(notify: Notify, command: Command) {
    this.isOpen.next(true);
    this.notify.next(notify);
    this.command = command;
  }

  confirm() {
    this.command?.execute();
  }

  hideNotification() {
    this.isOpen.next(false);
  }
}
