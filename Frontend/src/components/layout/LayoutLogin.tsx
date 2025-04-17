import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { createTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
});

const LayoutLogin: React.FC = () => {
    return (
        <AppProvider
            theme={theme}>
            <Outlet />
        </AppProvider>
    );
};

export default LayoutLogin;