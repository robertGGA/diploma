export interface Theme {
    name: string;
    properties: {
        [key: string]: string;
    };
}

export const lightTheme: Theme = {
    name: 'light',
    properties: {
        white: '#FFF',
    },
};
