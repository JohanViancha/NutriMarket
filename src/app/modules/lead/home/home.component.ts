import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CartBuyService } from '../../../core/services/cart-buy.service';
import { FoodService } from '../../../core/services/food.service';
import { ShHeaderComponent } from '../../../shared/components/sh-header/sh-header.component';
import { UserSession } from '../../../shared/models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShHeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  authServices = inject(AuthService);
  cartBuyServices = inject(CartBuyService);
  userSession$!: Observable<UserSession>;
  cartItemCount$!: Observable<number>;

  ngOnInit(): void {
    this.getSession();
    this.getCartItemCount();
  }


  getCartItemCount() {
    this.cartItemCount$ = this.cartBuyServices.getCartItemCount();
  }

  getSession(): void {
    this.userSession$ = this.authServices.getSession();
  }


  closeSession() {
    this.authServices.clearSession();
    this.router.navigate(['/auth']);
  }
}
