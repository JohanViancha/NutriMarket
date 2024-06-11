import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  from,
  iif,
  of,
  switchMap,
} from 'rxjs';
import { Food, db } from '../../../../db';
import { UserSession } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class CartBuyService {
  private cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  getCartItemCount(): Observable<number> {
    this.setCartItemCount();
    return this.cartItemCount.asObservable();
  }

  setCartItemCount(): void {
    this.cartItemCount.next(this.getCartBuy()?.cart?.length || 0);
  }

  setCartBuy(food: Food) {
    let currentSesion = this.getCartBuy();
    sessionStorage.setItem(
      'session',
      JSON.stringify({
        ...currentSesion,
        cart: !!currentSesion.cart ? [...currentSesion.cart, food] : [food],
      })
    );
  }

  getCartBuy(): UserSession {
    return JSON.parse(sessionStorage.getItem('session') || '{}');
  }

  removeCartItem(id: number) {
    let currentSesion = this.getCartBuy();
    let food = this.getCartBuy()?.cart?.filter((food: Food) => food.id !== id);
    sessionStorage.setItem(
      'session',
      JSON.stringify({ ...currentSesion, cart: food })
    );

    console.log(this.getCartBuy());
  }

  validateProductStock(
    idFood: number = 0,
    quantity: number = 0
  ): Observable<{ id: number; state: boolean }> {
    return from(
      db.foods
        .where('id')
        .equals(idFood)
        .and((food: Food) => food.quantity >= quantity)
        .toArray()
    ).pipe(
      switchMap((foods: Food[] = []) =>
        iif(
          () => foods.length > 0,
          of({ id: idFood, state: false }),
          of({ id: idFood, state: true })
        )
      )
    );
  }
}
