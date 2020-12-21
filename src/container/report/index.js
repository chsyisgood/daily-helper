import React from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { ContainerMain, ContainerSecondary } from '../../component/container.js';
import ReportPanel from '../../component/report-panel';


const dataService = require('../../service/data-service');
const utilService = require('../../service/util-service');

class ReportIndexPage extends React.Component {
    async update(date) {
        const result = await dataService.findReportByDate(date);
        console.log(result);
        if(result.success) {
            const data = result.data;

            this.setState({
                panels: data.panels || [],
                date: data.date
            });
        }
    }

    constructor(props) {
        super(props);
        const panels = props && props.panels || [];
        const date = props.match.params.date;

        this.state = {
            panels: panels,
            date: date
        };
        this.update(date);
    }

    render() {
        return (
            <ContainerMain>
                <div className='page-title'>Report {this.state.date}</div>
                <ContainerSecondary>
                    <Grid container spacing={3}>
                    {
                        this.state.panels.map((panel, index) => {
                            const color = utilService.panelColorHelper(index);
                            return (
                                <ReportPanel panel={panel} color={color.color} textColor={color.textColor} />
                            )
                        })
                    }
                    </Grid>
                </ContainerSecondary>
            </ContainerMain>
        );
    }
}

export default ReportIndexPage;
