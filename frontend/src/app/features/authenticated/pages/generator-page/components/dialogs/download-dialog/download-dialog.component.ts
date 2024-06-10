import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDialogComponent } from '@features/public/components/dialog/default-dialog/default-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { Scene } from 'three';

@Component({
    selector: 'rg-download-dialog',
    standalone: true,
    imports: [CommonModule, DefaultDialogComponent],
    templateUrl: './download-dialog.component.html',
    styleUrls: ['./download-dialog.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadDialogComponent {
    constructor(
        private dialogRef: DialogRef,
        @Inject(MAT_DIALOG_DATA) public data: GLTF
    ) {}

    closeDialog(): void {
        this.dialogRef.close();
    }

    public get modelLink(): string {
        const gltfData = JSON.stringify(this.data.scene.toJSON());
        const blobParts: BlobPart[] = [gltfData];
        return URL.createObjectURL(
            new File(blobParts, this.data.scene?.name || 'Unnamed Model')
        );
    }

    download(): void {
        const link = document.createElement('a');
        link.href = this.modelLink;
        link.download = 'model.gltf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    private convertGLTFToGLB(scene: Scene): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const exporter = new GLTFExporter();
            exporter.parse(
                scene,
                result => {
                    if (result instanceof ArrayBuffer) {
                        const blob = new Blob([result], {
                            type: 'model/gltf-binary',
                        });
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to convert GLTF to GLB.'));
                    }
                },
                () => {
                    return true;
                }
            );
        });
    }

    async downloadGLBModel() {
        if (this.data.scene) {
            try {
                const blob = await this.convertGLTFToGLB(
                    this.data.scene as any
                );
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = 'model.glb';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url); // Освобождаем URL после скачивания
            } catch (error) {
                console.error(
                    'An error occurred while converting or downloading the GLB model:',
                    error
                );
            }
        } else {
            console.error('Scene is not loaded.');
        }
    }
}
