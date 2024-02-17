import { Routes } from '@angular/router';
import { GeneratorPageComponent } from '@features/authenticated/pages/generator-page/generator-page.component';

export default [
    {
        path: '',
        component: GeneratorPageComponent,
    },
] satisfies Routes;
