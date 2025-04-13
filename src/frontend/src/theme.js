// src/theme.js
import { createTheme } from '@mui/material/styles';
import { purple, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[700],
    },
    secondary: {
      main: pink[400],
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Bebas Neue", "Anton", "League Spartan", sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '8px 20px',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
