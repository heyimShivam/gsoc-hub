import { Outlet } from 'react-router-dom';

import OrganizationState from './context/OrganizationState';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const { pathname } = useLocation();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A91D3A",
        light: "#ff8a50",
        dark: "#c41c00",
        contrastText: "#fff",
      }
    }
  });

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <OrganizationState>
        <div className="App back-color text-color">
          <Navbar />
          <div className="root-component">
            <Outlet />
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </OrganizationState>
    </ThemeProvider>
  );
}

export default App;
