import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#50a3b7',
      main: '#397a98',
      dark: '#3a6077',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ebdcd7',
      contrastText: '#397a98',
    },
  },
});

theme.props = {
  MuiIconButton: {
    color: 'inherit',
  },
};

theme.overrides = {
  MuiButton: {
    root: {
      marginLeft: '15px',
    },
  },
};

export default theme;
