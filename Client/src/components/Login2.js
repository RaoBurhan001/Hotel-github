import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions/constants';

import { GoogleLogin } from 'react-google-login';

let history = createBrowserHistory();
let self;
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        self = this;
    }

    responseGoogle = (response) => {
        let profile_data = response.profileObj;
        let data = {
            name: profile_data.name,
            profile_picture: profile_data.imageUrl,
            username: profile_data.email,
            social_signin: {
                name: 'google',
                id: profile_data.googleId
            }
        }

        self.createUserOrLoggedIn(data, 'google');
     //   console.log( {social_signin} )
    }

    handleChange(e){
        let {name, value} = e.target
        if (name === "username"){
            self.setState({
                username: value
            })
        } else {
            self.setState({
                password: value
            })
        }
    }

    createUserOrLoggedIn(data, strategy) {
        axios.post(`${process.env.REACT_APP_API}/social`, data)
            .then(res => {
                if(res.status === 200){
                     this.props.storeSocialId(res.body.social_signin.id)
                    if (res.data.code === 208){
                        console.log(res.data)
                    } else {
                        console.log(res.data)
                    }
                     history.push({
                         pathname: '/dashboard',
                        state: {id: res.body.social_signin.id}
                     });
                    history.go('/dashboard');
                } else {
                    console.log(res)
                }
            })
    }

   
    render(){
        console.log('render...', this.props.social_id)
        return(
            <div className="row" >

                                <div className="col-md-12">
                                    <GoogleLogin
                                        clientId={"317870189847-v7fdmpqkihi81tqr1kfr8mrln85jb4pf.apps.googleusercontent.com"}
                                        render={renderProps => (
                                            <button className="loginBtn loginBtn--google" onClick={renderProps.onClick}>
                                                    Login with Google
                                            </button>
                                        )}
                                        onSuccess={self.responseGoogle}
                                        onFailure={self.responseGoogle}
                                        />
                              
                      
                <div className="col-md-4">
                </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        social_id: state.social.socialId
                    
    }
}

export default connect(mapStateToProps, actions)(Login);