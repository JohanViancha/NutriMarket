import { Inject, Injectable, inject } from '@angular/core';
import { Command } from '../command.interfaces';
import { Router } from '@angular/router';
import { NotifyService } from '../../../services/notify.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectCommand implements Command {
  constructor(
    @Inject(String) private path: string,
    private router: Router,
    private notifyService: NotifyService
  ) {}

  execute(): void {
    this.router.navigate([this.path]);
    this.notifyService.hideNotification();
  }
}
