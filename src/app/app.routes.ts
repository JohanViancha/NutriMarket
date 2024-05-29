import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/login.routes').then(m => m.AUTH_ROUTES),
  },
];
