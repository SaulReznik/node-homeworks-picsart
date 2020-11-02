import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...otherProps }) =>
  true ? (
    <Route {...otherProps} render={props => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );

export default PrivateRoute;
