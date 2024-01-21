import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor(private http: HttpClient) {}

    private url = 'http://localhost:3000';

    testBackend(): Observable<string> {
        return this.http.get<string>(`${this.url}`, {
            headers: {
                Accept: 'text/*',
            },
        });
    }
}
