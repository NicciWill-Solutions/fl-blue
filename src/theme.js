import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#50a3b7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ebdcd7',
      contrastText: '#50a3b7',
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
