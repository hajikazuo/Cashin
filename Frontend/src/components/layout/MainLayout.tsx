import { Outlet } from "react-router-dom";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";
import { AppProvider } from '@toolpad/core/AppProvider';
import { Box, createTheme } from "@mui/material";
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Navigation from './Navigation';
import { useAuthSession } from "../../hooks/session";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

const MainLayout: React.FC = () => {
  const { session, authentication } = useAuthSession();

  return (
    <AppProvider
      branding={{
        logo: <img src="/logo.png" alt="Logo" />,
        title: 'Cash | In',
      }}
      session={session}
      authentication={authentication}
      navigation={Navigation}
      theme={theme}
    >
      <AuthMiddleware>
        <DashboardLayout>
          <Box
            sx={{
              p: 4,
            }}
          >
            <Outlet />
          </Box>
        </DashboardLayout>
      </AuthMiddleware>
    </AppProvider>
  );
};

export default MainLayout;
