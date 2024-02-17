import { Routes } from '@angular/router';
import { CollectionPageComponent } from '@features/authenticated/pages/collection-page/collection-page.component';

export default [
    {
        path: '',
        component: CollectionPageComponent,
    },
] satisfies Routes;
