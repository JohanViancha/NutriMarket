import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartBuyComponent } from './cart-buy/cart-buy.component';
import { ProductsComponent } from './products/products.component';

export const LEAD_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      { path: '', component: ProductsComponent },
      { path: 'cart', component: CartBuyComponent },
    ],
  },
];
