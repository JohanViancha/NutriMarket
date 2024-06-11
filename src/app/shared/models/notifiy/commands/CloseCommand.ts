import { Injectable, inject } from '@angular/core';
import { Command } from '../command.interfaces';
import { NotifyService } from '../../../services/notify.service';

@Injectable({
  providedIn: 'root',
})
export class CloseCommand implements Command {

  constructor(private notifyService: NotifyService){}

  execute(): void {
    this.notifyService.hideNotification();
  }
}
