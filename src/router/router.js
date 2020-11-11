import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

// Routers
import RouterBill from './bill';

import IndexPage from '../component/page';

class RouterIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path='/' exact component={ IndexPage } />
                    <Route path='/bill' component={ RouterBill } />
                </div>
            </Router>
        );
    };
}

export default RouterIndex;
