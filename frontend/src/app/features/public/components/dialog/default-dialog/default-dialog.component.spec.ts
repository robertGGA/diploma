import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDialogComponent } from './default-dialog.component';

describe('DefaultDialogComponent', () => {
    let component: DefaultDialogComponent;
    let fixture: ComponentFixture<DefaultDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DefaultDialogComponent],
        });
        fixture = TestBed.createComponent(DefaultDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
