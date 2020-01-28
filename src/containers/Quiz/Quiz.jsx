import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {fetchQuizById} from '../../store/actions/quiz';

class Quiz extends Component {

    onAnswerClickHandler = (answerId) => {

        if (this.props.answerState) {
            const key = Object.keys(this.props.answerState)[0];

            if (this.props.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.props.quiz[this.props.activeQuestion];
        const results = this.props.results;


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
                    this.setState({
                        isFinished: true,
                    })
                }
                window.clearTimeout(timeout);
            }, 500);
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

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        console.log(this.props)

        return (
            <div className={classes.Quiz}>
                <div>
                    <h1>Ответьте на все вопросы:</h1>

                    {
                    this.props.loading || !this.props.quiz?
                        <Loader /> :
                        this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRepeatButtonHandler={this.onRepeatButtonHandler}
                            />
                            :
                            <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                rightAnswer={this.props.rightAnswer}
                                onAnswerClickHandler={this.onAnswerClickHandler}
                                activeQuestion={this.props.activeQuestion}
                                questionsLength={this.props.quiz.length}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);