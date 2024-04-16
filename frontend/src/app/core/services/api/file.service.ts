import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    private API_URL = 'api/file';

    http = inject(HttpClient);

    upload(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(this.API_URL + '/upload', formData);
    }

    pythonExecute(body: { first: number; second: number }): Observable<any> {
        return this.http.post(this.API_URL + '/python', body);
    }
}
