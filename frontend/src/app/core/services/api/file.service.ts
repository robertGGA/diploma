import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { map } from 'rxjs/operators';
import { checkGLTFVersion } from '@shared/helpers/file.helper';

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

    pythonExecute(body: File[]): Observable<Uint8Array> {
        const formData = new FormData();
        body.forEach(file => {
            formData.append('file', file);
        });
        console.log('bere');
        return this.http.post<any>(this.API_URL + '/python', formData);
    }

    loadGLBFromArrayBuffer(arrayBuffer: ArrayBuffer) {
        const blob = new Blob([arrayBuffer], {
            type: 'application/octet-stream',
        });
        console.log(URL.createObjectURL(blob));
        return URL.createObjectURL(blob);
    }
}
