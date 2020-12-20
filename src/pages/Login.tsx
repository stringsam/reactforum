import React, {FC, useContext, useState} from 'react';
import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { signIn, signUp, useLoggedInUser } from '../utils/firebase';
import {LocalizationContext} from "../localization";

const Login: FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { texts, language } = useContext(LocalizationContext);

  const [error, setError] = useState<string>();

  const isLoggedIn = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='h1'>
          {texts[language]['login.title']}
        </Typography>
        <Typography variant='subtitle1'>{texts[language]['login.subtitle']}</Typography>
        <TextField
          label={texts[language]['login.email']}
          type='email'
          name='email'
          fullWidth
          autoComplete='email'
          margin='normal'
          variant='outlined'
          defaultValue={user}
          onChange={e => setUser(e.target.value)}
        />
        <TextField
          label={texts[language]['login.password']}
          type='password'
          name='password'
          fullWidth
          margin='normal'
          variant='outlined'
          defaultValue={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant='subtitle2' align='left' color='error' paragraph>
            <b>{error}</b>
          </Typography>
        )}
        <Typography variant='subtitle2' align='left' paragraph>
          <Link>
            <b>{texts[language]['login.forgotEmail']}</b>
          </Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='text'
          size='large'
          color='primary'
          // Handling promise with async/await
          onClick={async () => {
            try {
              await signUp(user, password);
            } catch (err) {
              setError(err.message);
            }
          }}
        >
          {texts[language]['login.createAccount']}
        </Button>
        <Button
          variant='text'
          size='large'
          color='primary'
          // Handling promise with chained handlers
          onClick={() =>
            signIn(user, password).catch(err => setError(err.message))
          }
        >
          {texts[language]['login.login']}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
