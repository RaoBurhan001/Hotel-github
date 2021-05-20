import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//rest is used to avoid the naming issue encountered through props
const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
