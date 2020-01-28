import React from 'react';
import classes from './AnswerItem.module.scss';

export default props => {

    const cls = [classes.AnswerItem];
    
    if ( props.state) {
        cls.push(classes[props.state])
    }

    return (
        <li 
            className={cls.join(' ')}
            onClick={() =>props.onAnswerClickHandler(props.answer.id)}    
        >
            {props.answer.text}
        </li>
    )
}