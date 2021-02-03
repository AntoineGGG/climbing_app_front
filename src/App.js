import { Switch, Route } from 'react-router-dom';
import { Router } from 'react-router';

import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import CragRoutes from './CragRoutes';
import Crags from './Crags';
import history from '../history';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/routes' component={CragRoutes} />

          <Route exact path='/crags' component={Crags} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
