import { NextFunction, Request, Response } from 'express';
import * as child from 'child_process';
import { FileService, transformVideoToImages } from '@services/file.service';
import * as path from 'node:path';
import * as fs from 'node:fs';
import file from '@src/middleware/file';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';

class GenerateController {
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

    async testPython(req: Request<{}, {}>, res: Response) {
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

            // res.json({ res: result });
        } catch (e) {
            res.status(500).send(e);
        }

        async function executePython<T>(path: string, ...args: Array<T>) {
            const params = args.map(data => {
                console.log(typeof data === 'object' && data instanceof Blob);
                if (typeof data === 'object' && data instanceof Blob) {
                    return data;
                }
            });

            const py = child.spawn('python', {});

            const result = await new Promise((resolve, reject) => {
                let output: unknown;

                py.stdout.on('data', data => {
                    output = JSON.parse(data);
                });

                py.stderr.on('data', data => {
                    console.error('[python]: ' + data);
                    reject('error: ' + data);
                });

                py.on('exit', code => {
                    resolve(output);
                });
            });

            return await result;
        }
    }
}

export const generateController = new GenerateController();
