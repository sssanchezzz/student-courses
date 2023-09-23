import { css } from '@emotion/react';
import { createTheme } from '@mui/material';

export const globalStyles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffab00',
            light: '#ffdf9f',
        },
        secondary: {
            main: '#f50057',
        },
    },
});
