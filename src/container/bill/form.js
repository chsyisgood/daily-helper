import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { ContainerMain, ContainerSecondary } from '../../component/container.js';
import { FormComponent, FormField } from '../../component/form.js';

import '../../style/common.css';

let billTypes = [ {} ];
let billTypesMap = new Map();

const dataService = require('../../service/data-service');

class BillFormPage extends React.Component {
    async init() {
        const result = await dataService.findAllBillTypes();
        if(result.success) {
            billTypes = result.data;

            billTypes.forEach((e) => {
                billTypesMap.set(e.title, e);
            });

            const currentBillType = billTypes[0].title;
            this.setState({ 
                billType: currentBillType,
                isPointCost: billTypesMap.get(currentBillType).is_default_point_cost,
                isPositiveCost: billTypesMap.get(currentBillType).is_positive_cost
            });
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            billType: '',
            date: new Date(),
            dateModified: new Date(),
            isDateChangable: true,
            isPointCost: true,
            isPositiveCost: true
        };

        this.init();
    };

    onChangeBillTypes = (event) => {
        const nextBillType = event.target.value;

        this.setState({
            billType: nextBillType,
            isPointCost: billTypesMap.get(nextBillType).is_default_point_cost,
            isPositiveCost: billTypesMap.get(nextBillType).is_positive_cost
        });
    };

    handleDateChange = (date) => {
        this.setState({ dateModified: date });
        this.setState({ date: date });
    };

    handleDateChangableSwitch = () => {
        let dateSwitch = this.state.isDateChangable;
        this.setState({ 
            date: dateSwitch? this.state.dateModified: new Date(),
            isDateChangable: !this.state.isDateChangable });
    };

    handlePointCostSwitch = () => {
        this.setState({ isPointCost: !this.state.isPointCost });
    };

    submitBill = () => {
        const price = this.state.price;
        const billType = this.state.billType;
        return 3;
        // service.create({
        //     price: price,
        //     billType: billType
        // });
    };

    render() {
        return (
            <div>
                <ContainerMain>
                    <div className='page-title'>Bill Form</div>
                    <ContainerSecondary>
                        <form>
                            {/* 1: price    bill-type    */}
                            <FormComponent>
                                <FormField xs>
                                    <CurrencyTextField
                                        label="Price *"
                                        id="standard-start-adornment"
                                        variant="filled"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                </FormField>

                                <FormField xs>
                                    <TextField
                                        id="standard-select-currency-native"
                                        select
                                        variant="filled"
                                        label="Bill Type"
                                        value={ this.state.billType }
                                        onChange={ this.onChangeBillTypes }
                                        SelectProps={{
                                            native: true,
                                        }}
                                        helperText=""
                                    >
                                        {billTypes.map((option) => (
                                            <option key={option.title} value={option.title}>
                                                {option.title}
                                            </option>
                                        ))}
                                    </TextField>
                                </FormField>

                            </FormComponent>

                            <FormComponent>
                                <FormField xs><FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.isDateChangable}
                                                onChange={this.handleDateChangableSwitch}
                                                color="primary"
                                            />
                                        }
                                        label="Current Date"
                                    />
                                </FormField>

                                <FormField xs>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            disabled={this.state.isDateChangable}
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date"
                                            value={this.state.date}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </FormField>

                            </FormComponent>

                            <FormComponent>
                                <FormField xs><FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.isPointCost}
                                                onChange={this.handlePointCostSwitch}
                                                color="secondary"
                                            />
                                        }
                                        label="Point Cost"
                                    />
                                </FormField>
                            </FormComponent>

                        </form>
                    </ContainerSecondary>
                    
                    <ContainerSecondary>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={this.submitBill}
                            startIcon={<SaveIcon />} >
                            Save
                        </Button>
                    </ContainerSecondary>
                </ContainerMain>
            </div>
        );
    }
}

export default BillFormPage;