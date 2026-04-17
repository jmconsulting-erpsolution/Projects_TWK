import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalModule } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)

      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MsalModule],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
