import {
  enableProdMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {
  bootstrapApplication,
  withEventReplay,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routes';
import { provideRouter } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
}).catch((err) => console.error(err));
