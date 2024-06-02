import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShInputComponent } from '../sh-input/sh-input.component';
import { RouterModule } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserSession } from '../../models/user';
import { ShButtonComponent } from '../sh-button/sh-button.component';

@Component({
  selector: 'app-sh-header',
  standalone: true,
  imports: [ShInputComponent, CommonModule, ShButtonComponent, RouterModule],
  templateUrl: './sh-header.component.html',
  styleUrl: './sh-header.component.css',
})
export class ShHeaderComponent implements OnInit {
  @Input() userSession$!: Observable<UserSession>;
  @Input() hasSearchBar: boolean = false;
  isPanelOpen = false;
  @Output() closeSessionEvent: EventEmitter<boolean> = new EventEmitter();

  user!: UserSession;

  ngOnInit(): void {
    this.userSession$
      .pipe(
        tap((user: UserSession) => {
          if (user) {
            this.user = user;
          }
        })
      )
      .subscribe();
  }

  closeSession() {
    this.closeSessionEvent.emit(true);
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;

    console.log(this.isPanelOpen);
  }
}
