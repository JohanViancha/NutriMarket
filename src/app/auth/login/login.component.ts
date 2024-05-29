import { Component, inject } from '@angular/core';
import { ShInputComponent } from '../../shared/components/sh-input/sh-input.component';
import { ShButtonComponent } from '../../shared/components/sh-button/sh-button.component';
import { ShNotifyComponent } from '../../shared/components/sh-notify/sh-notify.component';
import { NotifyService } from '../../shared/services/notify.service';
import { INCORRECT_USER_NOTIFICATION, INCORRECT_USER_NOTIFICATIONs } from '../../shared/models/notify';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ShInputComponent, ShButtonComponent, ShNotifyComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  notifyService = inject(NotifyService)

  test(){
    this.notifyService.showNotification(INCORRECT_USER_NOTIFICATION)
  
  }

  test2(){
    this.notifyService.showNotification(INCORRECT_USER_NOTIFICATIONs)
  
  }

}
