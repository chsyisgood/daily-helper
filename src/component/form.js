import React from 'react';

import Grid from '@material-ui/core/Grid';

/**
 * 
 * @param {*} props 
 */
const FormComponent = props => <Grid container direction="row"
justify="center"
alignItems="flex-end" {...props} />;

const FormField = props => <Grid item {...props} />;


export { FormComponent, FormField };
