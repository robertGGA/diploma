import { diskStorage, StorageEngine, FileFilterCallback } from 'multer';

const multer = require('multer');

const storage: StorageEngine = diskStorage({
    destination(req, file, cb) {
        cb(null, 'assets/');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

const types = ['image/*', 'image/jpeg', 'video/mp4'];

export type cbType = (error: Error | null, filename: string) => void;
const fileFilter = (
    req: any,
    file: Express.Multer.File,
    callback: FileFilterCallback
) => {
    if (types.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const FileMiddleware = multer({ storage: storage, fileFilter: fileFilter });

export default FileMiddleware;
