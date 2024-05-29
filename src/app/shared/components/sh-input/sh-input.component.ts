import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sh-input',
  standalone: true,
  imports: [],
  templateUrl: './sh-input.component.html',
  styleUrl: './sh-input.component.css'
})
export class ShInputComponent {

  @Input() type: string = 'text'
 
}
