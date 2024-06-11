import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FoodListComponent } from '../../../shared/components/food-list/food-list.component';
import { Food } from '../../../../../db';
import { NotifyService } from '../../../shared/services/notify.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FoodService } from '../../../core/services/food.service';
import { RedirectCommand } from '../../../shared/models/notifiy/commands/RedirectCommand';
import { USER_MUST_BE_LOGGED_IN } from '../../../shared/models/notifiy/notify.constant';
import { CartBuyService } from '../../../core/services/cart-buy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FoodListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  router = inject(Router);
  notifyServices = inject(NotifyService);
  authServices = inject(AuthService);
  foodServices = inject(FoodService);
  cartBuyServices = inject(CartBuyService);
  foodList$!: Observable<Food[]>;

  ngOnInit(): void {
    this.getFoodList();
  }

  getFoodList(): void {
    this.foodList$ = this.foodServices.getFoods();
  }

  addToCart(food: Food): void {
    if (this.checkUserLoggedIn()) {
      this.displayNotification();
    } else {
      this.cartBuyServices.setCartBuy(food);
      this.cartBuyServices.setCartItemCount();
    }
  }

  checkUserLoggedIn(): boolean {
    return !this.authServices.isUserLoggedIn();
  }

  displayNotification() {
    const redirectCommand = new RedirectCommand(
      '/auth',
      this.router,
      this.notifyServices
    );
    this.notifyServices.showNotification(
      USER_MUST_BE_LOGGED_IN,
      redirectCommand
    );
  }
}
