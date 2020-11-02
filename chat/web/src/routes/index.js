import { Switch, Route, Redirect } from 'react-router-dom';

import { Chat, Login, Registration } from '../pages';
import { PrivateRoute } from '../hoc';

const Routes = () => (
  <Switch>
    <PrivateRoute path="/chat" component={Chat} />
    <Route path="/login" component={Login} />
    <Route path="/registration" component={Registration} />
    <Redirect from="*" to="/login" />
  </Switch>
);

export default Routes;
