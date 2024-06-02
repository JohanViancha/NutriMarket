import { Component, Input } from '@angular/core';
import { FoodCardComponent } from '../food-card/food-card.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Food } from '../../../../../db';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [FoodCardComponent, CommonModule],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.css',
})
export class FoodListComponent {
  @Input() foodList$!: Observable<Food[]>;
}
