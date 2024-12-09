// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  // Add more customizations here (spacing, breakpoints, etc.)
});

export default theme;
