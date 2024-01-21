import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@shared/modules/theme/services/theme.service';
import { ThemeDirective } from './directives/theme.directive';
import { Theme } from '@shared/modules/theme/types/theme-types';

export const THEMES = new InjectionToken('THEMES');
export const ACTIVE_THEME = new InjectionToken('ACTIVE_THEME');

export interface ThemeOptions {
    themes: Theme[];
    active?: string;
}

@NgModule({
    declarations: [ThemeDirective],
    providers: [ThemeService],
    imports: [CommonModule],
})
export class ThemeModule {
    static forRoot(options: ThemeOptions): {
        ngModule: ThemeModule;
        providers: (
            | { useValue: Theme[]; provide: InjectionToken<unknown> }
            | {
                  useValue: string | undefined;
                  provide: InjectionToken<unknown>;
              }
        )[];
    } {
        return {
            ngModule: ThemeModule,
            providers: [
                {
                    provide: THEMES,
                    useValue: options.themes,
                },
                {
                    provide: ACTIVE_THEME,
                    useValue: options.active,
                },
            ],
        };
    }
}
