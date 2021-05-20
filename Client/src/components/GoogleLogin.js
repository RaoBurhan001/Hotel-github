import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import Home from '../booking/Home';
import { useHistory } from 'react-router';
const Login = (props)=>{

const history= useHistory()
const [name,setname] = useState('')
const [email,setemail] = useState('')
const [picture,setpicture] = useState('')
    const responseGoogle=(response)=>{
        console.log(response)
        // setname(response.profileObj.name)
        // setemail(response.profileObj.email)
        // setpicture(response.profileObj.imageUrl)
        history.push('/')
    }

    return(
        <div>
      
    <GoogleLogin
    clientId="317870189847-v7fdmpqkihi81tqr1kfr8mrln85jb4pf.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    {/* <h2>Welcome : {name}</h2>
    <h3> {email}</h3>
    <img src={picture} alt='google' /> */}
  </div>
)
}

export default Login;