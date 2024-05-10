import { ACCEPT_TYPES } from '@shared/ui/drag-n-drop/drag-n-drop.types';

export class FileHelper {
    static checkMimeTypeFile(file: Blob, mimeTypes: ACCEPT_TYPES) {
        return file.type.includes(mimeTypes);
    }

    static checkMimeTypeFileArray(files: Blob[], mimeTypes: ACCEPT_TYPES[]) {
        return files.some(file =>
            mimeTypes.includes(file.type as ACCEPT_TYPES)
        );
    }

    static isSameTypeOfFiles(files: Blob[], neededType: string) {
        return files.every(
            file => file.type === neededType || file.type.includes(neededType)
        );
    }
}
