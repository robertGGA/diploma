import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
    let component: TextFieldComponent;
    let fixture: ComponentFixture<TextFieldComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TextFieldComponent],
        });
        fixture = TestBed.createComponent(TextFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
