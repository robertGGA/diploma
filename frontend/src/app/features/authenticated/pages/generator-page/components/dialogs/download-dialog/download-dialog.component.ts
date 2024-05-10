import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDialogComponent } from '@features/public/components/dialog/default-dialog/default-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { from, Observable } from 'rxjs';

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
        return URL.createObjectURL(new File([], 'test'));
    }
}
