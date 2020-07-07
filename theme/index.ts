import {createMuiTheme} from '@material-ui/core/styles';
import {createStyles} from '@material-ui/core';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#409eb6',
    },
    secondary: {
      main: '#0BDE7D',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem'
    }
  }
});

const styles = createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  title: {
    flexGrow: 3,
    marginBottom: '1rem'
  },
});

export {theme};
export {styles};
