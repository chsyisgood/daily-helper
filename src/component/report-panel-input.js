import React from 'react';

/*       Material Components       */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ReportInputNumber, ReportInputNumberSelect, ReportInputNumberRange, ReportInputNumberText } from './report-item-input';

import '../style/common.css';

class ReportPanelInput extends React.Component {

    updateInput = (inputIndex, inputValue) => {
        let newPanel = this.state.panel;
        if (newPanel.items.length <= inputIndex) return;
        
        newPanel.items[inputIndex] = inputValue;

        let sumValue = 0;
        newPanel.items.forEach(element => {
            if (element && element.isActive) {
                sumValue += element.value;
            }
        });
        newPanel.value = sumValue;

        this.setState({ panel: newPanel });
        this.props.updatePanel(this.props.index, newPanel);
    };
    
    constructor(props) {
        super(props);
        this.updateInput= this.updateInput.bind(this);

        this.state = {
            panel: props.panel || {},
            color: props.color || 'red',
            textColor: props.textColor || 'black'
        };

        this.props.updatePanel(this.props.index, props.panel);
    };

    render() {
        return (
            <Grid item xs={12}>
                <div className="panel-item" style={{backgroundColor: this.state.color, color: this.state.textColor}}>
                    <Typography variant="h6" component="h5">
                        {this.state.panel.name}
                    </Typography>

                    {this.state.panel.items.map((item, index) => {

                        if (item.type === 'number') {
                            return (<ReportInputNumber item={item} index={index} updateInput={this.updateInput} />);
                        } else if (item.type === 'number_select') {
                            return (<ReportInputNumberSelect item={item} index={index} updateInput={this.updateInput} />);
                        } else if (item.type === 'number_range') {
                            return (<ReportInputNumberRange item={item} index={index} updateInput={this.updateInput} />);
                        } else if (item.type === 'number_text') {
                            return (<ReportInputNumberText item={item} index={index} rule={'checkNumber'} updateInput={this.updateInput} />);
                        }

                    })}
                </div>
            </Grid>
        );
    };
}

export default ReportPanelInput;
