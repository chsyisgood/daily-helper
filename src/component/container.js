import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const ContainerMain = props => <Container maxWidth='lg' style={{ backgroundColor: 'gray', paddingBottom: '6rem' }} {...props} />;

const ContainerSecondary = props => <Container maxWidth='md' style={{ marginBottom: '5rem' }} {...props} />;

export { ContainerMain, ContainerSecondary };
