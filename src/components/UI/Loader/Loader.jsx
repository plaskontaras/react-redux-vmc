import React from 'react';
import classes from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={classes['lds-hourglass']}></div>
    );
};

export default Loader;