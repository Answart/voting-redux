import { createMuiTheme } from '@material-ui/core/styles';

const fontWeightMedium = 500;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b7ebff',
      main: '#79c6e0',
      dark: '#215e72',
      contrastText: '#fff'
    },
    secondary: {
      light: '#b7ebff',
      main: '#5d5d5d',
      dark: '#79c6e0',
      contrastText: '#000'
    }
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `3px`,
  },
  divider: {
    margin: `2px 0`,
  },
  paper: {
    padding: '5px',
    textAlign: 'center',
    color: '#5d5d5d',
    whiteSpace: 'nowrap',
    marginBottom: '0px',
  },
  typography: {
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeightMedium,
    body1: {
      fontWeight: fontWeightMedium,
    },
    button: {
      fontStyle: 'italic',
    },
    htmlFontSize: 14,
  }
});


export default theme;
