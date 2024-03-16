import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileTransformToUrl',
})
export class FileTransformToUrlPipe implements PipeTransform {
    transform(value: Blob | null): string {
        console.log(value);
        if (!value) return '';

        return URL.createObjectURL(value);
    }
}
