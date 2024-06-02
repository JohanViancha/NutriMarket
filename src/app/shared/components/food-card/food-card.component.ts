import { Component, Input } from '@angular/core';
import { Food } from '../../../../../db';
import { CommonModule } from '@angular/common';
import { ShButtonComponent } from '../sh-button/sh-button.component';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [CommonModule, ShButtonComponent],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.css',
})
export class FoodCardComponent {
  @Input() food!: Food;
}
