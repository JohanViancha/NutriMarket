import { TestBed } from '@angular/core/testing';
import { CartBuyService } from './cart-buy.service';


describe('CartBuyService', () => {
  let service: CartBuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartBuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
