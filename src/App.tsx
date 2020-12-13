import React, {FC, useState} from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';

import './App.css';

import { signOut, useLoggedInUser } from './utils/firebase';

// MUI theme override
const ourTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#9B61FF',
    },
    secondary: {
      main: '#FFF861',
    },
  },
});

const useStyles = makeStyles(theme => ({
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  menuButton: { marginRight: theme.spacing(2) },
  link: { textDecoration: 'none' },
}));

const App: FC = () => {
  // Styles
  const classes = useStyles();

  // Login state
  const user = useLoggedInUser();

  return (
    <MuiThemeProvider theme={ourTheme}>
      <Router>
      {/*  App*/}
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
