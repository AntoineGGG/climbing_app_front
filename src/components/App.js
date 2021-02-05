import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Login from './Login';
import Layout from './Layout';
import history from '../history';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route component={Layout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
