import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import LandingPage from '../components/LandingPage';
import PrivateRoute from './privateRoute';
import Songs from '../components/Songs';
import Recommended from '../components/Recommended';

const Routes = (props) => {
    return (
        <div>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/songs/:id" component={Songs} />
            <PrivateRoute path="/recommended" component={Recommended} />
        </div>
    )
}

export default Routes;