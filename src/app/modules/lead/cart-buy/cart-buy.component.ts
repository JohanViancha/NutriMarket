import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Food } from '../../../../../db';
import { CartBuyService } from '../../../core/services/cart-buy.service';
import { ShAlertComponent } from '../../../shared/components/sh-alert/sh-alert.component';
import { ShButtonComponent } from '../../../shared/components/sh-button/sh-button.component';
import { ShInputComponent } from '../../../shared/components/sh-input/sh-input.component';
import { CartBuyForm } from '../../../shared/models/cart';
import { CurrencyCopPipe } from '../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-cart-buy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShAlertComponent,
    ShInputComponent,
    ShButtonComponent,
    CurrencyCopPipe,
  ],
  templateUrl: './cart-buy.component.html',
  styleUrl: './cart-buy.component.css',
})
export class CartBuyComponent implements OnInit {
  formCart!: FormGroup;
  cartBuyServices = inject(CartBuyService);
  fb = inject(FormBuilder);
  products!: Food[];

  ngOnInit(): void {
    this.getCartItems();
    this.initForm();
  }

  initForm() {
    this.formCart = this.fb.group({
      items: this.fb.array<CartBuyForm>([]),
    });
    this.addItem();
  }

  removeCartItem(id: number, index: number) {
    this.cartBuyServices.removeCartItem(id);
    this.cartBuyServices.setCartItemCount();
  }

  get items() {
    return this.formCart.get('items') as FormArray;
  }

  addItem() {
    this.products.forEach((element, index) => {
      let item = this.fb.group({
        food: element,
        quantity: this.fb.control(1, [Validators.pattern(/^[1-9]\d*$/)]),
      });
      this.items.push(item);

      item
        .get('quantity')
        ?.valueChanges.pipe(
          switchMap((value) =>
            this.cartBuyServices.validateProductStock(
              item.get('food')!.value?.id,
              Number(value)!
            )
          ),
          tap((value = { id: 0, state: false }) =>
            this.handleStockError(value, index)
          )
        )
        .subscribe();
    });
  }

  getCartBuyFormItem(index: number) {
    return this.items.at(index);
  }

  handleStockError(value: { id: number; state: boolean }, index: number) {
    if (value.state) {
      this.addStockError(value, index);
      return;
    }
    if (
      this.getCartBuyFormItem(index).get('quantity')!.hasError('stockError')
    ) {
      this.removeStockError(value, index);
    }
  }

  addStockError(value: { id: number; state: boolean }, index: number) {
    this.getCartBuyFormItem(index).get('quantity')!.setErrors({
      stockError: 'Stock insuficiente',
    });
  }

  removeStockError(value: { id: number; state: boolean }, index: number) {
    let control = this.getCartBuyFormItem(index);
    if (control.errors && control.errors['manualError']) {
      const { stockError, ...otherErrors } = control.errors;
      control.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
    }
  }

  calculateSubtotal() {
    return this.formCart.get('items')?.value.reduce(
      (accumulator: number, currentValue: CartBuyForm) => {
        console.log(currentValue);
        accumulator =
          accumulator +
          Number(currentValue.food?.price!) * Number(currentValue.quantity!);
        return accumulator;
      },

      0
    );
  }

  doOder() {
    console.log(this.formCart);
  }

  getCartItems() {
    this.products = this.cartBuyServices.getCartBuy()?.cart || [];
  }
}
