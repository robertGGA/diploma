import { TestBed } from '@angular/core/testing';

import { UrlInterceptor } from './url.interceptor';

describe('UrlInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [UrlInterceptor],
        })
    );

    it('should be created', () => {
        const interceptor: UrlInterceptor = TestBed.inject(UrlInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
