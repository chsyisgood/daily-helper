import React from 'react';

/*       Material Components       */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import '../style/common.css';

let someColor = 'blue';

class ReportItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.item && props.item.value || 0,
            name: props.item && props.item.name || '',
            comments: props.item && props.item.comments || []
        };
    };

    handlePoint = () => {
        const point = this.state.value || '';
        return point === '' ? '' : (point + ' pt');
    };

    render() {
        return (
            <Card className="card-item" variant="outlined">
                <CardContent>
                    <Typography variant="body1" component="p">
                        {this.state.name}
                        <span className="point-component" style={{color: someColor}}>{this.handlePoint()}</span>
                    </Typography>
                    {this.state.comments.map(comment => {
                        return (
                            <Typography variant="body2" component="p" color="textSecondary">{comment}</Typography>
                        );
                    })}
                </CardContent>
            </Card>
        );
    };
};

export default ReportItem;
