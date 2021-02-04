import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import CragRoutes from './CragRoutes';
import Crags from './Crags';
import Home from './Home';
import AllCragRoutes from './AllCragRoutes';
import AllCrags from './AllCrags';
import history from '../history';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/routes' component={CragRoutes} />
          <Route exact path='/routes/all' component={AllCragRoutes} />
          <Route exact path='/crags' component={Crags} />
          <Route exact path='/crags/all' component={AllCrags} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
