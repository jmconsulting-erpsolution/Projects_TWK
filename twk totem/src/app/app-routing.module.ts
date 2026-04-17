import { Inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './theme/shared/guard/auth.guard';

// export const canActivateGuard = (authGuardService = Inject(authGuard)) => authGuardService.canActivate();

const routes: Routes = [

  {
    path: '',
    redirectTo: 'guest/login',
    pathMatch: 'full'
  },

  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'list',
        loadChildren: () => import('./demo/List/Route').then(c => c.routes)
      },
      {
        path: 'card',
        loadChildren: () => import('./demo/Card/Route').then(c => c.routes)
      }
    ]
  },

  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module')
            .then(m => m.AuthenticationModule)
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'guest/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

