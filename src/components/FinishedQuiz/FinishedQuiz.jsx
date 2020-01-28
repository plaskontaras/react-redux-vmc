import React from 'react';
import classes from './FinishedQuiz.module.scss';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

export default props => {

    let successCounter = 0;
    for (let key in props.results) {
        if (props.results[key] === 'success') {
            successCounter++;
        }
    }

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]],
                    ];

                    return (
                        <li key={index}>
                            <strong>{quizItem.id}</strong>
                            {props.quiz[index].question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>Right {successCounter} of {props.quiz.length}</p>
            <div>
                {/* <button onClick={props.onRepeatButtonHandler}>Repeat</button> */}
                <Button onClick={props.onRepeatButtonHandler} type="primary">Повторить</Button>
                <Link to='/'>
                    <Button type="success">Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}