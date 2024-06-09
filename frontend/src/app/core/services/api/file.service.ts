import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    private API_URL = 'api/file';

    http = inject(HttpClient);

    upload(file: File): Observable<unknown> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(this.API_URL + '/upload', formData);
    }

    getFile(id: string): Observable<Blob> {
        return this.http.get<Blob>(this.API_URL + `/file/${id}`);
    }

    isReady(id: string): Observable<boolean> {
        return this.http
            .get<boolean>(this.API_URL + `/file/${id}/ready`)
            .pipe(shareReplay());
    }

    pythonExecute(body: File[]): Observable<Uint8Array> {
        const formData = new FormData();
        body.forEach(file => {
            formData.append('file', file);
        });
        return this.http.post<Uint8Array>(this.API_URL + '/python', formData);
    }

    loadGLBFromArrayBuffer(arrayBuffer: ArrayBuffer) {
        const blob = new Blob([arrayBuffer], {
            type: 'application/octet-stream',
        });
        return URL.createObjectURL(blob);
    }
}
