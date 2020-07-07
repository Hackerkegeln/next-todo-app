import {createMuiTheme} from '@material-ui/core/styles';
import {createStyles} from '@material-ui/core';

// Create a theme instance.
export const theme = createMuiTheme({
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

export const styles = createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  createNewTodo: {
    marginTop: '1rem'
  },
  todoList: {
    marginTop: '1rem'
  },
  title: {
    marginBottom: '1rem'
  },
  footer: {
    marginTop: '1rem'
  }
});
