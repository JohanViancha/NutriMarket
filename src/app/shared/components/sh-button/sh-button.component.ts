import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sh-button',
  standalone: true,
  imports: [],
  templateUrl: './sh-button.component.html',
  styleUrl: './sh-button.component.css',
})
export class ShButtonComponent {
  @Input() disabled: boolean = false;
  @Output() onclick: EventEmitter<boolean> = new EventEmitter();

  click() {
    this.onclick.emit();
  }
}
