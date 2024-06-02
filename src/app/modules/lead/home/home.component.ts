import { Component, OnInit, inject } from '@angular/core';
import { ShHeaderComponent } from '../../../shared/components/sh-header/sh-header.component';
import { FoodListComponent } from '../../../shared/components/food-list/food-list.component';
import { FoodService } from '../../../core/services/food.service';
import { Observable } from 'rxjs';
import { Food } from '../../../../../db';
import { AuthService } from '../../../core/services/auth.service';
import { UserSession } from '../../../shared/models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShHeaderComponent, FoodListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  authServices = inject(AuthService);
  foodServices = inject(FoodService);
  userSession$!: Observable<UserSession>;
  foodList$!: Observable<Food[]>;

  ngOnInit(): void {
    this.getFoodList();
    this.getSession();
  }

  getSession(): void {
    this.userSession$ = this.authServices.getSession();
  }

  getFoodList(): void {
    this.foodList$ = this.foodServices.getFoods();
  }

  closeSession() {
    this.router.navigate(['/auth']);
    this.authServices.clearSession();
  }
}
