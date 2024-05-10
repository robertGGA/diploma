import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorSideMenuComponent } from './generator-side-menu.component';

describe('GeneratorSideMenuComponent', () => {
    let component: GeneratorSideMenuComponent;
    let fixture: ComponentFixture<GeneratorSideMenuComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [GeneratorSideMenuComponent],
        });
        fixture = TestBed.createComponent(GeneratorSideMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
