import React, {FC, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {
  CircularProgress,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';

import './App.css';
import {LocalizationCtx, texts} from './localization'

import { signOut, useLoggedInUser } from './utils/firebase';
import Container from '@material-ui/core/Container/Container';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Discussion from './pages/Discussion';
import About from './pages/About';

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

  const [localization, setLocalization] = useState<'cs' | 'en'>('cs');

  return (
      <MuiThemeProvider theme={ourTheme}>
        <LocalizationCtx.Provider value={{ localization, setLocalization }}>
          <Router>
            <AppBar>
              <Toolbar>
                {/* TODO Styles*/}
                <Link to='/'>
                  <Button> Home</Button>
                </Link>
                <Link to='/about'>
                  <Button>About</Button>
                </Link>
                {user === null && (
                  <Link to='/login'>
                    <Button>Login</Button>
                  </Link>
                )}
                {user && (
                  <>
                    <Link to='/discussion'>
                      <Button>Discussion</Button>
                    </Link>
                    <Link to='/profile'>
                      <Button>Profile</Button>
                    </Link>
                    <Button onClick={signOut}>
                      Logout
                    </Button>
                  </>
                )}

              </Toolbar>
            </AppBar>

            {user === null && <Redirect to='/login' />}

            <main>
            <Container className='content' maxWidth='sm'>
            {user === undefined ? (
              <CircularProgress />
            ) : (
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/about' exact component={About} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/disccussion' exact component={Discussion} />
              </Switch>
            )}
          </Container>
            </main>
          </Router>
        </LocalizationCtx.Provider>
      </MuiThemeProvider>

      
  );
};

export default App;
