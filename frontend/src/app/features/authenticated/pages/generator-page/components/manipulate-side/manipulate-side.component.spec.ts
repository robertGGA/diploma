import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateSideComponent } from './manipulate-side.component';

describe('ManipulateSideComponent', () => {
    let component: ManipulateSideComponent;
    let fixture: ComponentFixture<ManipulateSideComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ManipulateSideComponent],
        });
        fixture = TestBed.createComponent(ManipulateSideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
