import {NextFunction, Request, Response} from "express";

class GenerateController {
    async upload(req: Request, res: Response) {
        console.log(req.file, req.body);
        try {
            if (req.file) {
                res.setHeader('Content-type', req.file.mimetype);
                return res.json(req.file);
            }
            res.status(400).send({
                error: 'Wrong type of file'
            });
        } catch (e) {
            res.status(400).send({
                error: 'Cannot handle file'
            });
        }
    }

}

export const generateController = new GenerateController();