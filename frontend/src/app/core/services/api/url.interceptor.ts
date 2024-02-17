import { Inject, Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@app/app.module';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
    constructor(@Inject(API_URL) private url: string) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(
            request.clone({
                url:
                    request.url.startsWith('http') ||
                    request.url.startsWith('/')
                        ? request.url
                        : [this.url, request.url].join('/'),
            })
        );
    }
}
