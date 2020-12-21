import React from 'react';

/*       Material Components       */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ReportItem from './report-item';

import '../style/common.css';

class ReportPanel extends React.Component {
    constructor(props) {
        super(props);
        const items = props.panel && props.panel.items || [];

        this.state = {
            name: props.panel && props.panel.name || '',
            items: items,
            color: props.color || 'red',
            textColor: props.textColor || 'black'
        };
    };

    render() {
        return (
            <Grid item xs={6}>
                <div className="panel-item" style={{backgroundColor: this.state.color, color: this.state.textColor}}>
                    <Typography variant="h6" component="h5">
                        {this.state.name}
                    </Typography>

                    {this.state.items.map(item => {
                        if (item.isActive) {
                            return (
                                <ReportItem item={item} />
                            );
                        }
                    })}
                </div>
            </Grid>
        );
    };
}

export default ReportPanel;
