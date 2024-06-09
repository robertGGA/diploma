import { Request, Response } from 'express';
import * as child from 'child_process';
import { transformVideoToImages } from '@services/file.service';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';

class GenerateController {
    async getFile(req: Request<{}, {}>, res: Response) {
        return res.json(null);
    }

    async upload(req: Request<{}, {}>, res: Response) {
        try {
            if (req.file) {
                if (req.file.mimetype.includes('video')) {
                    const result = await transformVideoToImages(
                        req.file.originalname
                    );
                    return res.json(result);
                }
                res.setHeader('Content-type', req.file.mimetype);
                return res.json(req.file);
            }
            res.status(400).send({
                error: 'Wrong type of file',
            });
        } catch (e) {
            console.log(e);
            res.status(400).send({
                error: 'Cannot handle file',
            });
        }
    }

    async executeScript(req: Request<{}, {}>, res: Response) {
        try {
            if (req.files) {
                const gltf = await executePython('', req.files);
                const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
                const document = await io.read(gltf as string);
                const arrayBuffer = await io.writeBinary(document);

                // Устанавливаем заголовки для отправки бинарных данных
                res.set('Content-Type', 'application/octet-stream');
                res.send(arrayBuffer);
            } else {
                res.status(414).send();
            }
        } catch (e) {
            res.status(500).send(e);
        }

        async function executePython<T>(path: string, ...args: Array<T>) {
            const params: string = args
                .map(data => {
                    if (typeof data === 'object' && data instanceof File) {
                        return data.name;
                    }
                    return '';
                })
                .join(',');

            const pyImprove = child.spawn('python', [
                '../python-libs/enchance-image/index.py',
                params,
                'assets',
            ]);

            const pyGenerator = child.spawn('python', [
                '../python-libs/generator/index.py',
                params,
                'assets/models',
            ]);

            const result = await new Promise((resolve, reject) => {
                let output: unknown;

                pyImprove.stdout.on('data', data => {
                    pyGenerator.stdout.on('data', data => {
                        output = JSON.parse(data);
                    });

                    pyGenerator.stderr.on('data', data => {
                        console.error('[generato]: ' + data);
                        reject('error: ' + data);
                    });

                    pyGenerator.on('exit', code => {
                        resolve(output);
                    });
                });

                pyImprove.stderr.on('data', data => {
                    console.error('[improve]: ' + data);
                    reject('error: ' + data);
                });

                pyImprove.on('exit', code => {
                    resolve(output);
                });
            });

            return await result;
        }
    }
}

export const generateController = new GenerateController();
