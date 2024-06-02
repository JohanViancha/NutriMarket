import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/lead/lead.routes').then((m) => m.LEAD_ROUTES),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
