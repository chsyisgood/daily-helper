import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { format } from 'date-fns'

import { ContainerMain, ContainerSecondary } from '../../component/container.js';

import ReportPanelInput from '../../component/report-panel-input';

const dataService = require('../../service/data-service');
const utilService = require('../../service/util-service');

const DEFAULT_DATE = '2020-12-10';

class ReportFormPage extends React.Component {
    async init(date) {
        let result = await dataService.findReportByDate(date);

        if (result.success && result.data.panels) {
            const data = result.data;
            this.setState({ 
                panels: data.panels || []
            });
            this.updatePoint();
            return;
        }

        // if not found, use DEFAULT_DATE and created for today's report
        result = await dataService.findReportByDate(DEFAULT_DATE);

        if (result.success) {
            let data = result.data;
            this.setState({ 
                panels: data.panels || [],
                date: format(new Date(), 'yyyy-MM-dd')
            });
            this.updatePoint();
            return;
        }
    };
    
    constructor(props) {
        super(props);
        const date = props.match.params.date || format(new Date(), 'yyyy-MM-dd');

        this.state = { 
            value: 0, 
            panels: [],
            date: date,
            isAlertOpen: false,
            alertMsg: ''
        };

        this.updatePanel= this.updatePanel.bind(this);
        this.init(date);
    };

    handleSubmit = async () => {
        this.updatePoint();

        const report = {
            panels: this.state.panels,
            isSchema: false,
            value: this.state.value,
            date: this.state.date
        };

        const result = await dataService.createOrUpdateReport(report, this.state.date);
        if (result.success) {
            this.setState({
                isAlertOpen: true,
                alertMsg: `Successfully submit the Report ${this.state.date} of ${this.state.value} pt!`
            });
        } else {

        }
    };

    handleAlertClose = () => {
        this.setState({
            isAlertOpen: false,
            alertMsg: ''
        });
    };

    updatePanel = (panelIndex, panelValue) => {
        const newPanels = this.state.panels;
        if(newPanels.length <= panelIndex) return;

        newPanels[panelIndex] = panelValue;
        this.setState({ panels: newPanels });

        this.updatePoint();
    }

    updatePoint = () => {
        let result = 0;
        const panels = this.state.panels || [];
        panels.forEach(panel => result += panel.value || 0);

        this.setState({ value: result });
    };

    render() {
        return (
            <ContainerMain>
                <div className='page-title'>Report Form</div>
                <div className='page-title'>Total Points are: {this.state.value}  pt</div>
                <div className='page-title'>Report date is: {this.state.date}</div>
                <ContainerSecondary>
                    <Grid container spacing={3}>
                    {
                        this.state.panels.map((panel, index) => {
                            const color = utilService.panelColorHelper(index);
                            return (
                                <ReportPanelInput panel={panel} index={index} updatePanel={this.updatePanel} color={color.color} textColor={color.textColor} />
                            )
                        })
                    }
                    </Grid>

                    <Button variant="contained" color="primary" size="large" disableElevation onClick={this.handleSubmit}>
                        Submit
                    </Button>

                </ContainerSecondary>

                <Dialog
                    open={this.state.isAlertOpen}
                    onClose={this.handleAlertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Operation Info"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.alertMsg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAlertClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </ContainerMain>
        )
    }
};

export default ReportFormPage;
