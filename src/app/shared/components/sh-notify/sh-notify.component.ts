import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Notify } from '../../models/notifiy/notify.interfaces';
import { NotifyService } from '../../services/notify.service';
import { ShButtonComponent } from '../sh-button/sh-button.component';

@Component({
  selector: 'app-sh-notify',
  standalone: true,
  imports: [ShButtonComponent, CommonModule],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', [animate(200)]),
    ]),
  ],
  templateUrl: './sh-notify.component.html',
  styleUrl: './sh-notify.component.css',
})
export class ShNotifyComponent implements OnInit {
  notifyService = inject(NotifyService);

  notify!: Notify;
  isNotifyOpen$ = new Observable<boolean>();

  ngOnInit(): void {
    this.isNotifyOpen$ = this.notifyService.isNotifyOpen$;
    this.notifyService.notify$.subscribe((notify: Notify) => {
      this.notify = notify;
    });
  }

  hasCancel() {
    this.notifyService.hideNotification();
  }

  hasConfirmed() {
    this.notifyService.confirm();
  }
}
