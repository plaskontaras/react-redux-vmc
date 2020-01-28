import React from 'react';
import classes from './ActiveQuiz.module.scss';
import AnswersList from './AnswersList/AnswersList';

let ActiveQuiz = (props) => {    
    return (
        <div className={classes.ActiveQuiz}>
            <p>
                <span>
                    <strong>1.</strong>&nbsp;
                    {props.question}
                </span>
                <span>{props.activeQuestion + 1} of {props.questionsLength}</span>
            </p>

            <AnswersList
                answers={props.answers}
                onAnswerClickHandler={props.onAnswerClickHandler}
                state={props.state}
            />
        </div>
    )
}

export default ActiveQuiz;