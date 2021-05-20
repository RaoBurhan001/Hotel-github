import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { SocialID } from './auth';
const rootReducer = combineReducers({
  auth: authReducer,
  social :SocialID
});

export default rootReducer;
