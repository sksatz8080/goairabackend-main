import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import DashboardPage from './pages/Dashboard';
import UserPage from './pages/User';
import AdminPage from './pages/Admin';
import DriverPage from './pages/Driver';
import FranchisePage from './pages/Franchise';
import PaymentPage from "./pages/Payment";
import SubscriptionPage from "./pages/Subscription";
import VehiclePage from "./pages/Vehicle";

const MainRouter = () => {
    
    
        return (
            <Router>                    
                <Switch>
                    
                    <Route path="/" exact component={DashboardPage} />
                    <Route path="/user" component={UserPage} />                    
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/driver" component={DriverPage} />
                    <Route path="/vehicle" component={AdminPage} />
                    <Route path="/franchise" component={FranchisePage} />
                    <Route path="/payment" component={PaymentPage} />
                    <Route path="/subscription" component={SubscriptionPage} />
                </Switch>
            </Router>
        )
    }
    
 
    
    


export default MainRouter;