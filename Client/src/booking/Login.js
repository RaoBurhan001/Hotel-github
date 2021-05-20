import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId ="317870189847-v7fdmpqkihi81tqr1kfr8mrln85jb4pf.apps.googleusercontent.com"
  // '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

const Login=()=> {
   
  const history = useHistory();
  
  const handleLogin = async googleData => {
    const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }

  return (
    <div>
      <GoogleLogin
clientId ="317870189847-v7fdmpqkihi81tqr1kfr8mrln85jb4pf.apps.googleusercontent.com"
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/>
    </div>
  );
}

export default Login;
