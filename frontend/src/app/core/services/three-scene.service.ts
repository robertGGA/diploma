import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { Camera, Object3D, Scene, WebGLRenderer } from 'three';

@Injectable({
    providedIn: 'any',
})
export class ThreeSceneService {
    private scene: Scene;
    webGLRenderer: WebGLRenderer | null = null;
    private camera?: Camera;

    constructor(
        private renderer: Renderer2,
        private canvas: ElementRef<HTMLCanvasElement>
    ) {
        this.scene = new Scene();
    }

    get threeScene(): Scene {
        return this.scene;
    }

    get threeCanvas(): ElementRef<HTMLCanvasElement> {
        return this.canvas;
    }

    build(
        params?: Object3D[],
        canvas?: ElementRef<HTMLCanvasElement>
    ): ThreeSceneService {
        if (canvas) {
            this.canvas = canvas;
        }

        if (params) {
            this.addExtensionAsArray(params);
        }
        return this;
    }

    private addExtensionAsArray(params: Object3D[]): void {
        params.forEach(extension => {
            this.addExtension(extension);
        });
    }

    private createCanvas(): void {}

    addExtension(ext: Object3D): ThreeSceneService {
        if (!this.isSceneCreated) throw Error('Init scene first');

        if (ext instanceof Camera) {
            this.camera = ext;
            return this;
        }

        this.scene.add(ext);
        return this;
    }

    removeExtension(ext: Object3D): ThreeSceneService {
        if (!this.isSceneCreated) throw Error('Init scene first');

        this.scene.remove(ext);
        return this;
    }

    clearScene(): void {
        this.scene.clear();
    }

    get isSceneCreated(): boolean {
        return !!this.scene;
    }

    startRenderingLoop() {
        this.webGLRenderer = new WebGLRenderer({
            canvas: this.canvas.nativeElement,
        });
        this.webGLRenderer.setSize(1000, 400);

        if (!this.camera) {
            throw new Error('Add camera instance');
        }
        this.camera.position.z = 5;
        const render = () => {
            requestAnimationFrame(render);
            this.webGLRenderer?.render(this.scene, this.camera!);
        };

        render();
    }
}
