import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import CragRoutes from './CragRoutes';
import Crags from './Crags';
import Home from './Home';
import AllCragRoutes from './AllCragRoutes';
import AllCrags from './AllCrags';
import history from '../history';

// This is the best way that I found to hide the
// Navbar on the login page cause I hade a lot of problem
// with "withRouter"

const Layout = () => {
  return (
    <div className='main-layout'>
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/routes' component={CragRoutes} />
          <Route exact path='/routes/all' component={AllCragRoutes} />
          <Route exact path='/crags' component={Crags} />
          <Route exact path='/crags/all' component={AllCrags} />
        </Switch>
      </Router>
    </div>
  );
};

export default Layout;
