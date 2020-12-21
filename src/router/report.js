import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import ReportIndexPage from '../container/report/index';
import ReportFormPage from '../container/report/form.js';

class RouterReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Route path='/report/date=:date' exact component={ ReportIndexPage } />
                <Route path='/report/form=:date' exact component={ ReportFormPage } />
                <Route path='/report/form' exact component={ ReportFormPage } />
            </div>
        );
    };
}

export default RouterReport;
