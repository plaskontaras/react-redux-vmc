import React from 'react';
import classes from './AnswersList.module.scss';
import AnswerItem from './AnswerItem/AnswerItem';

export default props => (
    <ul className={classes.AnswersList}>
        {props.answers.map( (answer, index) => {
            return (
                <AnswerItem 
                    answer={answer}
                    key={index}
                    onAnswerClickHandler={props.onAnswerClickHandler}
                    state={ props.state ? props.state[answer.id] : null }
                />
            )
        })}
    </ul>
)

// answerState: {[index]: 'error'}