import {
  enableProdMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  bootstrapApplication
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/interceptors/auth-interceptor';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
}).catch((err) => console.error(err));
