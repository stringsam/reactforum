import React, {FC, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {
  CircularProgress,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';

import './App.css';
import {LocalizationCtx} from './localization'

import { signOut, useDetailUser, useLoggedInUser } from './utils/firebase';
import Container from '@material-ui/core/Container/Container';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Discussion from './pages/Discussion';
import About from './pages/About';
import ProfileEdit from './components/ProfileEdit';
import { ProfileCtx } from './components/ProfileCtx';

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

const App: FC = () => {

  // Login state
  const user = useLoggedInUser();

  const userDetail = useDetailUser();
  userDetail.uid = user?.uid

  const [localization, setLocalization] = useState<'cs' | 'en'>('cs');
  const [profile, setProfile] = useState(userDetail);

  useEffect(() => {
    setProfile(userDetail)
  }, [user, userDetail])

  return (
      <MuiThemeProvider theme={ourTheme}>
        <LocalizationCtx.Provider value={{ localization, setLocalization }}>
          <ProfileCtx.Provider value={{profile, setProfile}}>
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
                <Route path='/discussion/:ref' exact component={Discussion} />
                <Route path='/profileEdit' exact component={ProfileEdit} />
              </Switch>
            )}
          </Container>
            </main>
          </Router>
          </ProfileCtx.Provider>
        </LocalizationCtx.Provider>
      </MuiThemeProvider>

      
  );
};

export default App;
