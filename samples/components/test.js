import React, {Component} from 'react';
import TestResults from './test_results';
import TestButtons from './test_buttons';

import {API_GET_CONFIG, API_TESTS_PATH, API_URL, PATH_QUESTIONS} from '../common/constants';
import Loading from "./loading";

class Test extends Component {

    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    };

    componentDidMount() {

        this.setState({isLoading:true});
        const { params } = this.props.match;

        let url = `${API_URL}${API_TESTS_PATH}/${params.id}`;
        console.info(`Fetching from ${url}...`);

        fetch(url, API_GET_CONFIG)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data, isLoading: false })
            })
            .catch(
                error => {
                    console.error( error);
                    this.setState({ error, isLoading: false })
                }
            );
    }

    render() {

        const { data, isLoading, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading || data == null) {
            return <Loading />
        } else {

            console.log(JSON.stringify(data));

            return (<div className="p-3">
                <div className="card card-default mb-3">

                    <div className="card-header">
                        {data.category} {data.originalTestId != null ? ('(Re:' + data.originalTestId + ')') : ''} Test {data.id}
                    </div>

                    <TestResults data={data}/>

                    <div className="card-body">
                        <div>
                            <div className="list-group" id="list-tab" role="tablist">
                                {this.createQuestions(data)}
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="text-center">
                            <TestButtons data={data}/>
                        </div>
                    </div>
                </div>

            </div>);
        }
    }

    createQuestions() {

        const {data} = this.state;

        let ch = 'A';
        let testEnded = (data.endTime != null);
        let questions = [];
        let firstQuestionId = data.questions[0].id;

        console.info("firstQuestionId: ", firstQuestionId);

        // console.info("Test ended:", testEnded);

        for (let i = 0; i < data.questions.length; i++) {
            let question = data.questions[i];
            questions.push(
                <a className={"list-group-item list-group-item-action" + (testEnded || firstQuestionId === question.id || question.viewed ? '' : ' disabled') + (!testEnded ? '' : (question.correct ? '' : ' list-group-item-danger'))} href={PATH_QUESTIONS + '/' + question.id} key={question.id}>
                    <div className="d-flex justify-content-between">
                        <div>
                            Question {question.id - firstQuestionId + 1}
                            {testEnded && (
                                <span className="pl-3">{question.questionSummary}</span>
                            )}
                        </div>
                        <div>
                            {
                                question.bookmarked && (<i className="fas fa-bookmark fa-lg text-warning pt-1 pb-1 pr-2 pl-2" data-toggle="tooltip" data-placement="left" title="Bookmarked"/>)
                            }
                            {
                                question.answered && question.answerIndex > -1 && (
                                    <span className="alert alert-secondary pt-1 pb-1 pr-2 pl-2">
                                        {String.fromCharCode(ch.charCodeAt(0) + question.answerIndex)}
                                    </span>
                                )
                            }
                            {!testEnded ? '' : (question.correct ? <i className="fas fa-check-circle fa-lg pl-2 text-success"/> : <i className="fas fa-times-circle fa-lg pl-2 text-danger"/>)}
                            {/*<i className="far fa-bookmark fa-lg pl-2 text-warning"/>*/}
                        </div>
                    </div>
                </a>
            );
        }

        return questions;
    }
}

export default Test;
