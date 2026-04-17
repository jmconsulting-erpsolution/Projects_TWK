import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MsalModule } from '@azure/msal-angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule, MsalModule]
})
export class AuthenticationModule {}
