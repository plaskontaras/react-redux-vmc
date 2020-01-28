import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

export default class Quiz extends Component {

    state = {
        results: {},
        activeQuestion: 0,
        isFinished: false,
        answerState: null, // {[id]: 'success' or 'error'}
        quiz: [],
        loading: true,
    }

    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];

            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;


        if (answerId === question.rightAnswer) {

            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                } else {
                    console.log('thats all');
                    this.setState({
                        isFinished: true,
                    })
                }
            }, 500);
            // clearTimeout(timeout);
        } else {
            console.log('mistake');
            results[question.id] = 'error';
            this.setState({
                answerState: { [answerId]: 'error' },
                results,
            })
        }
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 !== this.state.quiz.length;
    }

    onRepeatButtonHandler = () => {
        this.setState({
            results: {},
            activeQuestion: 0,
            isFinished: false,
            answerState: null,
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false,
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div>
                    <h1>Ответьте на все вопросы:</h1>

                    {this.state.loading ?
                        <Loader /> :
                        this.state.isFinished ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRepeatButtonHandler={this.onRepeatButtonHandler}
                            // goToQuizList={this.goToQuizList}
                            />
                            :
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                rightAnswer={this.state.rightAnswer}
                                onAnswerClickHandler={this.onAnswerClickHandler}
                                activeQuestion={this.state.activeQuestion}
                                questionsLength={this.state.quiz.length}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}