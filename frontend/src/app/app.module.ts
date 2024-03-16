import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';
import { UrlInterceptor } from '@core/services/api/url.interceptor';
import { ThreeModule } from '@shared/modules/three/three.module';

export const API_URL = new InjectionToken<string>('api.url');

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ThreeModule],
    providers: [
        {
            provide: API_URL,
            useValue: environment.API_URL,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UrlInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
