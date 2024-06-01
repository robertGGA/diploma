import * as fs from 'fs';

export async function transformVideoToImages(file: string) {
    try {
        const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
        const ffmpeg = require('fluent-ffmpeg');
        ffmpeg.setFfmpegPath(ffmpegPath);
        const inputVideoPath = 'assets/' + file;

        const outputFolderName = 'extractedVideo_' + Date.now(); // Создаем уникальное имя для папки
        const outputFolderPath = 'assets/' + outputFolderName;
        createFolderIfNotExists(outputFolderPath);

        ffmpeg(inputVideoPath)
            .outputOptions('-vf', 'fps=1')
            .output(outputFolderPath + '/output_%03d.jpg')
            .on('end', () => {
                console.log('Извлечение кадров завершено.');
            })
            .on('error', (err: unknown) => {
                console.error('Ошибка при извлечении кадров:', err);
            })
            .run();
    } catch (e) {
        console.log(e);
    }
}

export class FileService {}

function createFolderIfNotExists(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}
