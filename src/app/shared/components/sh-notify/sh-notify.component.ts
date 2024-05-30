import { Component, Input, OnInit, inject } from '@angular/core';
import { ShButtonComponent } from '../sh-button/sh-button.component';
import { CommonModule } from '@angular/common';
import { NotifyService } from '../../services/notify.service';
import { Observable, iif, of, switchMap } from 'rxjs';
import { Notify } from '../../models/notify';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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

  hasConfirmed() {
    this.notifyService.hideNotification();
  }
}
