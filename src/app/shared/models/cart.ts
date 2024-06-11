import { FormControl } from '@angular/forms';
import { Food } from '../../../../db';

export interface CartBuyForm {
  food: Food | null;
  quantity: number | null;
}
