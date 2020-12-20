import React, {FC, useCallback, useEffect, useState} from 'react';
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
  createMuiTheme, fade, makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';

import './App.css';
import { Localization, LocalizationContext, texts } from './localization';

import { signOut, useDetailUser, useLoggedInUser } from './utils/firebase';
import Container from '@material-ui/core/Container/Container';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Discussion from './pages/Discussion';
import About from './pages/About';
import ProfileEdit from './components/ProfileEdit';
import { ProfileCtx } from './components/ProfileCtx';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

// MUI theme override
const ourTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#61b5ff',
    },
    secondary: {
      main: '#FFF861',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: '#ffffff',
    textDecoration: "none"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}), {index: 1});

const App: FC = () => {

  // Login state
  const user = useLoggedInUser();

  const userDetail = useDetailUser();
  userDetail.uid = user?.uid

  const [language, setLanguage] = useState<Localization['language']>('en');
  const toggleLanguage = useCallback(
      () => setLanguage(prev => (prev === 'cs' ? 'en' : 'cs')),
      [],
  );
  const [profile, setProfile] = useState(userDetail);
  const classes = useStyles();

  useEffect(() => {
    setProfile(userDetail)
  }, [user, userDetail])


  return (
      <MuiThemeProvider theme={ourTheme}>
        <LocalizationContext.Provider value={{ texts, language }}>
          <ProfileCtx.Provider value={{profile, setProfile}}>
          <Router>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <Link className={classes.titleLink} to='/login'>
                    Mega forum
                  </Link>
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                {user === null && (
                <Link to='/login'>
                  <Button variant={"contained"} className={classes.menuButton} color="primary">{texts[language]['toolbar.login']}</Button>
                </Link>
                )}
                {user && (
                <>
                <Link to='/profile'>
                  <Button variant={"contained"} className={classes.menuButton} color="primary">{texts[language]['toolbar.profile']}</Button>
                </Link>
                  <Button onClick={signOut} variant={"contained"} className={classes.menuButton} color="primary">{texts[language]['toolbar.logout']}</Button>
                </>
                )}
                <Button className={classes.menuButton} onClick={toggleLanguage}>
                  {language === 'cs'
                      ? texts[language]['toolbar.en']
                      : texts[language]['toolbar.cs']}
                </Button>
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
        </LocalizationContext.Provider>
      </MuiThemeProvider>

      
  );
};

export default App;
