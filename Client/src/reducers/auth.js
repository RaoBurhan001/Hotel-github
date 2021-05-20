
import { GOOGLE_OAUTH2 } from "../actions/constants";

let userState;
//use to access the local storage 
if (window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  userState = null; 
}

export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};



let initialState = {
  socialId: ""
}


export const SocialID = (state = initialState, action)=>{
  switch(action.type){
      case 'SOCIAL_ID':
          console.log('reducer...', action.payload)
          return Object.assign({}, state, { socialId: action.payload })

      case 'GET_SOCIAL_ID':
          return state.socialId

      default:
          return state;
  }
}



// const initialState = [];

// export const googleReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GOOGLE_OAUTH2: {
//       return action.googleResponse;
//     }
//     default:
//       return state;
//   }
// };