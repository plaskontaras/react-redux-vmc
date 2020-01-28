import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, onRepeatButtonHandler } from '../../store/actions/quiz';

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.repeatButtonHandler();
    }

    render() {

        return (
            <div className={classes.Quiz}>
                <div>
                    <h1>Ответьте на все вопросы:</h1>

                    {
                        this.props.loading || !this.props.quiz ?
                            <Loader /> :
                            this.props.isFinished ?
                                <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRepeatButtonHandler={this.props.repeatButtonHandler}
                                />
                                :
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    rightAnswer={this.props.rightAnswer}
                                    onAnswerClickHandler={this.props.onAnswerClick}
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
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        onAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        repeatButtonHandler: () => dispatch(onRepeatButtonHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);