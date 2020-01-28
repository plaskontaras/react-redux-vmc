import React, { Component } from 'react';
import classes from './QuizCreator.module.scss';
import Button from '../../components/UI/Button/Button';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/input/input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
import axios from '../../axios/axios-quiz';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

function createOptionControl(number) {
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Value can not be empty',
        id: number,
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter your question',
            errorMessage: 'Question can not be empty'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswer: 1,
        formControls: createFormControls(),
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    addQuestionHandler = (event) => {
        event.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;
        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ],
            rightAnswer: this.state.rightAnswer,
        }

        quiz.push(questionItem);

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswer: 1,
            formControls: createFormControls(),
        })
    }

    createQuizHandler = async event => {
        event.preventDefault();

        try {
            await axios.post('/quizes.json', this.state.quiz)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswer: 1,
                formControls: createFormControls(),
            })
        } catch (e) {
            console.log(e);
        }
    }

    changeHandler = (value, controlName) => {

        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={index + controlName}>
                    <Input
                        key={'' + index + controlName}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={control.shouldValidate}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        console.log(event.target.value);
        this.setState({
            rightAnswer: +event.target.value
        })
    }

    render() {

        const select = <Select
            label='Choose right answer'
            value={this.state.rightAnswer}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>VTest creation</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}
                        {select}

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                    </Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Create test
                    </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);