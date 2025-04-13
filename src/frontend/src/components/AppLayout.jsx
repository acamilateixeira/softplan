import { Outlet, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box
} from '@mui/material';
import { Brightness2, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../contexts/ThemeContext';
import GlobalSnackbar from '../components/GlobalSnackbar';

const AppLayout = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontFamily: '"Pacifico", cursive',
            fontWeight: 'bold',
            letterSpacing: 1,
            userSelect: 'none',
            color: '#ffeb00',
          }}
        >
          🎂 Cake App
        </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/">Bolos</Button>
            <Button color="inherit" component={Link} to="/summary">Resumo</Button>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7 /> : <Brightness2 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>

      <GlobalSnackbar /> 
    </>
  );
};

export default AppLayout;
