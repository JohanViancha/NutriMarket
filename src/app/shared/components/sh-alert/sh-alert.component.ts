import { Component, Input } from '@angular/core';
import { Type } from '../../models/ui-alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sh-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sh-alert.component.html',
  styleUrl: './sh-alert.component.css',
})
export class ShAlertComponent {
  @Input() text: string = '';
  @Input() type: Type = 'info';


  
}
