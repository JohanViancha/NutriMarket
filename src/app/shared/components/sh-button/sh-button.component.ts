import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sh-button',
  standalone: true,
  imports: [],
  templateUrl: './sh-button.component.html',
  styleUrl: './sh-button.component.css'
})
export class ShButtonComponent {

  @Input() text:string = 'Button'
}
