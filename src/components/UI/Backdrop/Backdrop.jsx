import React from 'react';
import classes from './Backdrop.module.scss';

export default props => <div className={classes.Backdrop} onClick={props.onClick}/>