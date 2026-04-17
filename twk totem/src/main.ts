import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { LayoutService } from './app/Layout/Layout.service';
import { AppService } from './app/app.service';

if (environment.production) {
  enableProdMode();
}

if (!window.crypto) {
  window.crypto = {
    getRandomValues: (array: Uint8Array) => array,
    subtle: {} as SubtleCrypto,
  } as Crypto;
}

import { provideHttpClient } from '@angular/common/http'; // 👈 aggiungi questo import
import { AuthService } from './app/theme/shared/service/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideAnimations(),
    provideHttpClient(), // ✅ aggiungi questo
    LayoutService,
    AuthService,
    AppService,
  ],
}).catch((err) => console.error(err));



