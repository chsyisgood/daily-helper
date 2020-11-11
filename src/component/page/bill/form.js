import React from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import '../../style/common.css';


const BILL_TYPES = {
    REEDEEM: 'Redeem',
    ONLINE_SHOPPING: 'Online Shopping',
    OFFLINE_SHOPPING: 'Offline Shopping',
    FOOD: 'Food'
};

const billTypes = [ BILL_TYPES.REEDEEM, BILL_TYPES.ONLINE_SHOPPING, BILL_TYPES.OFFLINE_SHOPPING, BILL_TYPES.FOOD ];

// const service = require('../../../../app/data-access/bill.js');

class BillFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            billType: BILL_TYPES.REEDEEM
        };
    };

    onChangeBillTypes = (event) => {
        this.setState({ billType: event.target.value });
        console.log(this.state.billType);
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
                <Container maxWidth='md' style={{ backgroundColor: 'red' }}>
                    <div className='page-title'>Bill Form</div>
                    <form>
                        <TextField id="standard-basic" label="Price *" />

                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Native select"
                            value={this.state.billType}
                            onChange={this.onChangeBillTypes}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select your currency"
                        >
                            {billTypes.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option}
                                </option>
                            ))}
                        </TextField>                               
                                                                                                           
                        <Button                               
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={this.submitBill}
                            startIcon={<SaveIcon />} >
                            Save
                        </Button>

                    </form>
                </Container>
            </div>
        );
    }
}

export default BillFormPage;