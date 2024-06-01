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

export function checkGLTFVersion(arrayBuffer: ArrayBuffer): boolean {
    console.log(arrayBuffer);
    const text = new TextDecoder().decode(new Uint8Array(arrayBuffer));
    console.log(text);
    const json = JSON.parse(text);
    console.log(json);
    return (
        json.asset &&
        json.asset.version &&
        parseFloat(json.asset.version) >= 2.0
    );
}
