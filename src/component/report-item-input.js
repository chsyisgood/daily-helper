import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';

import '../style/common.css';

class ReportInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = { item: props.item || {} };
    };

    updateItemValue = (item, newValue) => {
        let newItem = item;
        item.value = newValue;
        this.setState({ item: newItem });

        this.props.updateInput(this.props.index, newItem);
    };

    handleClick = () => {
        let newItem = this.state.item;
        newItem.isActive = !this.state.item.isActive;

        this.setState({ item: newItem });
        this.props.updateInput(this.props.index, newItem);
    };

    handleCommentClick = () => {
        const isOn = !this.state.isCommentOn;
        this.setState({
            isCommentOn: isOn
        });
    }

    handleCommentChange = (event) => {
        const text = event.target.value;
        let item = this.state.item;
        item.comments[0] = text;
        this.setState({
            item: item
        });
        console.log(text);
    };
};

class ReportInputNumber extends ReportInput {
    constructor (props) {
        super(props);
        this.state = { 
            item: props.item || {},
            isCommentOn: false
         };
    };

    render() {
        return (
            <Card className="card-item" variant="outlined">
                <CardContent>
                    <Typography variant="body1" component="p">
                        <Checkbox
                            checked={this.state.item.isActive}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            onChange={this.handleClick}
                        />
                        {this.state.item.name}
                        <span className="point-component" style={{ color: 'red' }}>{this.state.item.value} pt</span>

                        <IconButton onClick={this.handleCommentClick}><ChatIcon/></IconButton>
                        {
                            this.state.isCommentOn ? (
                                <TextField defaultValue={this.state.item.comments[0]} style={{ margin: 8 }} placeholder={"write some thing done..."}
                                helperText="Comment" fullWidth multiline="true" margin="normal" InputLabelProps={{ shrink: true }}
                                variant="filled" onChange={this.handleCommentChange} />
                            ) : ( <Typography variant="body2"> {this.state.item.comments[0]} </Typography>)
                        }
                    </Typography>
                </CardContent>
            </Card>
        )
    }
};

class ReportInputNumberText extends ReportInput {
    constructor(props) {
        super(props);
        this.state = { 
            item: props.item || {},
            textError: false,
            min: props.item.values[0],
            max: props.item.values[1] || 100000,
            text: props.item.values[2] || '',
            errMsg: '',
            rule: props.rule || '',
            isCommentOn: false
         };
    };

    inputRangeCheck = (value) => {
        let textError = false, errMsg = '', item = this.state.item;

        if (value < this.state.min) {
            textError = true;
            errMsg = `minimum amount is ${this.state.min}`;
        }
        if (value > this.state.max) {
            textError = true;
            errMsg = `maximum amount is ${this.state.max}`;
        }

        this.setState({
            textError: textError,
            errMsg: errMsg
        });
    }

    handleTextChange = (event, value) => {
        let item = this.state.item;
        if (this.state.rule === 'checkNumber') {
            this.inputRangeCheck(value);
        }
        item.values[2] = value;

        this.setState({
            item: item,
            text: value
        });
    };

    render() {
        return (
            <Card className="card-item" variant="outlined">
                <CardContent>
                    <Typography variant="body1" component="p">
                        <Checkbox
                            checked={this.state.item.isActive}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            onChange={this.handleClick}
                        />
                        {this.state.item.name}
                        <span className="point-component" style={{ color: 'red', marginRight: '3rem' }}>{this.state.item.value} pt</span>
                        
                        <CurrencyTextField
                            label="Weight lb."
                            variant="filled"
                            textAlign="left"
                            value={this.state.text}
                            onChange={this.handleTextChange}
                            error={this.state.textError}
                            helperText={this.state.errMsg}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                        />

                        <IconButton onClick={this.handleCommentClick}><ChatIcon/></IconButton>
                        {
                            this.state.isCommentOn ? (
                                <TextField defaultValue={this.state.item.comments[0]} style={{ margin: 8 }} placeholder={"write some thing done..."}
                                helperText="Comment" fullWidth multiline="true" margin="normal" InputLabelProps={{ shrink: true }}
                                variant="filled" onChange={this.handleCommentChange} />
                            ) : ( <Typography variant="body2"> {this.state.item.comments[0]} </Typography>)
                        }

                    </Typography>
                </CardContent>
            </Card>
        )
    }
};

class ReportInputNumberSelect extends ReportInput {
    constructor(props) {
        super(props);
        this.state = { 
            item: props.item,
            selectValue: props.item.value,
            isCommentOn: false
        };
        this.updateItemValue(props.item, props.item.value);
    };

    handleSelect = (event) => {
        const newPointValue = event.target.value;
        this.setState({
            selectValue: newPointValue
        });
        this.updateItemValue(this.state.item, parseInt(newPointValue));
    };

    handleItemText = (value, index) => {
        if (!this.state.item || !this.state.item.marks) return `${value} pt`;
        return `${value} pt (${this.state.item.marks[index]})`
    };

    render() {
        return (
            <Card className="card-item" variant="outlined">
                <CardContent>
                    <Typography variant="body1" component="p">
                        <Checkbox
                            checked={this.state.item.isActive}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            onChange={this.handleClick}
                        />
                        {this.state.item.name}
                        <span className="point-component" style={{ color: 'red', marginRight: '3rem' }}>{this.state.item.value} pt</span>

                        <TextField
                            id="standard-select-currency-native"
                            select
                            variant="filled"
                            label="Point"
                            value={ this.state.selectValue }
                            SelectProps={{native: true,}}
                            onChange={this.handleSelect}
                        >
                            {
                                this.state.item.values.map((value, index) => {
                                    return (
                                    <option key={value} value={value}>
                                        {this.handleItemText(value, index)}
                                    </option>
                                    )
                                })
                            }
                        </TextField>

                        <IconButton onClick={this.handleCommentClick}><ChatIcon/></IconButton>
                        {
                            this.state.isCommentOn ? (
                                <TextField defaultValue={this.state.item.comments[0]} style={{ margin: 8 }} placeholder={"write some thing done..."}
                                helperText="Comment" fullWidth multiline="true" margin="normal" InputLabelProps={{ shrink: true }}
                                variant="filled" onChange={this.handleCommentChange} />
                            ) : ( <Typography variant="body2"> {this.state.item.comments[0]} </Typography>)
                        }

                    </Typography>
                </CardContent>
            </Card>
        )
    };
};

class ReportInputNumberRange extends ReportInput {
    constructor (props) {
        super(props);
        this.state = { 
            item: props.item,
            rangeValue: props.item.value,
            min: props.item.values[1],
            max: props.item.values[2],
            step: props.item.values[3],
            marks: props.item.marks || null,
            isCommentOn: false
        };

        this.updateItemValue(this.state.item, props.item.value);
    };

    valuetext = (value) => {
        return `${value} pt`;
    };

    handleChange = (event, newValue) => {
        this.updateItemValue(this.state.item, parseInt(newValue));
    };

    render () {
        return (
            <Card className="card-item" variant="outlined">
                <CardContent>
                    <Typography variant="body1" component="p">
                        <Checkbox
                            checked={this.state.item.isActive}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            onChange={this.handleClick}
                        />
                        {this.state.item.name}
                        <span className="point-component" style={{ color: 'red' }}>{this.state.item.value} pt</span>
                        <IconButton onClick={this.handleCommentClick}><ChatIcon/></IconButton>

                        <Typography id="discrete-slider" gutterBottom>
                        </Typography>

                        <div style={{maxWidth:'50%'}}>
                        <Slider
                            defaultValue={this.state.rangeValue}
                            getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            onChange={this.handleChange}
                            step={this.state.step}
                            marks={this.state.marks}
                            min={this.state.min}
                            max={this.state.max}
                        />
                        </div>

                        {
                            this.state.isCommentOn ? (
                                <TextField defaultValue={this.state.item.comments[0]} style={{ margin: 8 }} placeholder={"write some thing done..."}
                                helperText="Comment" fullWidth multiline="true" margin="normal" InputLabelProps={{ shrink: true }}
                                variant="filled" onChange={this.handleCommentChange} />
                            ) : ( <Typography variant="body2"> {this.state.item.comments[0]} </Typography>)
                        }

                    </Typography>
                </CardContent>
            </Card>
        )
    }
};

export {
    ReportInputNumber,
    ReportInputNumberSelect,
    ReportInputNumberRange,
    ReportInputNumberText
};
