import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Food, db } from '../../../../db';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  getFoods(): Observable<Food[]> {
    return from(db.foods.toArray());
  }
}
