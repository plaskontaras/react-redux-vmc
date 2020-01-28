import React from 'react';
import classes from './Button.module.scss';

const Button = props => {

    let cls = [
        classes.Button,
        classes[props.type],
    ]

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;