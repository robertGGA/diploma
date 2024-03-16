import { FileTransformToUrlPipe } from './file-transform-to-url.pipe';

describe('FileTransformToUrlPipe', () => {
    it('create an instance', () => {
        const pipe = new FileTransformToUrlPipe();
        expect(pipe).toBeTruthy();
    });
});
