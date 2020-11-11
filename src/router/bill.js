import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import BillIndexPage from '../component/page/bill/index.js';
import BillFormPage from '../component/page/bill/form.js';

class RouterBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Route path='/bill' exact component={ BillIndexPage } />
                <Route path='/bill/form' exact component={ BillFormPage } />
            </div>
        );
    };
}

export default RouterBill;
