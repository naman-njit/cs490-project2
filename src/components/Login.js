import * as React from 'react';
import { GoogleLogin } from 'react-google-login';

export function Login(props) {
  const { setUser } = props;

  const responseGoogle = (response) => {
    fetch('/api/login/oauth', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'no-cors',
      body: JSON.stringify({ user: response }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setUser(data);
        });
      }
    });
  };

  return (
    <GoogleLogin
      clientId="998047635259-97u2qfmpfre6nb7btat6bp4q8he7cfbc.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      cookiePolicy="single_host_origin"
      isSignedIn
    />
  );
}
export default Login;
