import { Component } from '@angular/core';
import { ShInputComponent } from '../../shared/components/sh-input/sh-input.component';
import { ShButtonComponent } from '../../shared/components/sh-button/sh-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ShInputComponent, ShButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
