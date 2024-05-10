import { NextFunction, Request, Response } from 'express';
import * as child from 'child_process';
import { transformVideoToImages } from '@services/file.service';

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

    async testPython(req: Request<{}, {}, { images: File[] }>, res: Response) {
        try {
            const result = await executePython<any>(
                '/Users/gadelshinrr/Desktop/diploma/python-libs/object-finder/index.py',
                req.body.images
            );
            res.json({ res: result });
        } catch (e) {
            res.status(500).send(e);
        }

        async function executePython<T>(path: string, ...args: Array<T>) {
            console.log(path, args);
            const params = args.map(data => {
                if (!data) {
                    return '';
                }

                if (typeof data === 'string') {
                    return data;
                }

                if (
                    typeof data === 'number' ||
                    typeof data === 'boolean' ||
                    typeof data === 'string'
                ) {
                    return data.toString();
                }

                return '';
            });

            const py = child.spawn('python', [path, ...params]);

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
