import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { LoginData } from '@core/types/authorize-types/authorize.types';
import { Tokens } from '@core/types/authorize-types/token.types';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: Tokens | null = null;
    constructor(private http: HttpClient) {}

    login(data: LoginData): Observable<string> {
        return this.http.post<string>('auth/login', data).pipe(shareReplay());
    }

    authorize(tokens: Tokens): void {
        localStorage.setItem('token', tokens.token);
        this.token = tokens;
    }
}
