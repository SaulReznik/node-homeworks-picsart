import { BrowserRouter as Router } from 'react-router-dom';

// routing
import Routes from './routes';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
