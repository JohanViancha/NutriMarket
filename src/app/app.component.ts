import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShNotifyComponent } from './shared/components/sh-notify/sh-notify.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShNotifyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NutriMarket';
}
