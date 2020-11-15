import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...otherProps }) =>
  sessionStorage.getItem('token') &&
  sessionStorage.getItem('token') !== 'undefined' ? (
    <Route {...otherProps} render={props => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );

export default PrivateRoute;
