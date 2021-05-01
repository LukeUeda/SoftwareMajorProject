import React, {Component} from 'react';
import {API_POST_CONFIG, API_QUESTIONS_PATH, API_URL, PATH_TESTS} from '../common/constants';
import Pager from "./pager";
import Loading from "./loading";
import QuestionTemplateAlwaysTestSwitch from "./question_template_always_test_switch";
import QuestionBookmarkSwitch from "./question_bookmark_switch";

import {getGetOptions} from "./ApiUtils";

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
        this.selectAnswer = this.selectAnswer.bind(this);
    };

    componentDidMount() {

        this.setState({isLoading:true});
        const { params } = this.props.match;

        let url = `${API_URL}/${API_QUESTIONS_PATH}/${params.id}`;
        console.info(`Fetching from ${url}...`);

        let apiConfig = getGetOptions();

        console.log("Username is :", apiConfig.headers.username);

        fetch(url, apiConfig)
            .then(response => response.json())
            .then(data => {

                // console.info(JSON.stringify(data));
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

            let testEnded = (data.endTime != null);

            return (<div className="p-3">
                <div className="card card-default mb-3">

                    <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <div>
                                {data.category} {data.originalTestId != null ? ('(Re:' + data.originalTestId + ')') : ''} Test {data.testId} - {data.id - data.firstQuestionId + 1} / {data.totalQuestions}
                                {testEnded && (
                                    <span className="pl-3 force-select-all">{data.questionSummary}</span>
                                )}
                            </div>
                            <div>
                                <QuestionBookmarkSwitch id={data.id} checked={data.bookmarked}/>

                                <span className="pl-2"/>
                                <QuestionTemplateAlwaysTestSwitch id={data.questionTemplateId} checked={data.alwaysTest}/>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">

                        <Pager data={data}/>

                        <div className="alert alert-primary">
                            <span dangerouslySetInnerHTML={{__html: data.question}}/>
                        </div>

                        {this.createHint(data)}

                        <div>
                            <div className="list-group">
                                {this.createAnswers(data)}
                            </div>
                        </div>
                    </div>

                    <div className="card-footer text-center">
                        <a className="btn btn-primary" href={PATH_TESTS + '/' + data.testId} role="button">Go Back to Test</a>
                    </div>
                </div>
            </div>);
        }
    }

    createHint(data) {

        if (data.hint == null || data.endTime == null) {
            return "";
        }

        return <div id="hint" className="alert alert-danger text-left" role="alert">
                    <span dangerouslySetInnerHTML={{__html: data.hint}}/>
                </div>;
    }


    selectAnswer(answerId) {
        // alert('The link was clicked.');
        // console.log('clicked ' + answerId);

        const {data} = this.state;

        let url = `${API_URL}/${API_QUESTIONS_PATH}/${data.id}?answerId=${answerId}`;
        fetch(url, API_POST_CONFIG)
            .then(response => response)
            .catch(
                error => {
                    console.error( error);
                    this.setState({ error, isLoading: false })
                }
            );
    }

    createAnswers() {

        const {data} = this.state;

        let testEnded = (data.endTime != null);
        let ch = 'A';
        let answers = [];
        for (let i = 0; i < data.answers.length; i++) {
            let answer = data.answers[i];

            if (testEnded) {

                answers.push(
                    <li className={"list-group-item"
                        + (
                            // This is the correct answer
                            answer.correct ? (
                                    !answer.selected ?
                                        // Correct answer selected
                                        ' list-group-item-warning' :
                                        // Correct answer not selected
                                        ' list-group-item-success'
                                ) :
                                (answer.selected ?
                                    // Wrong answer selected
                                    ' list-group-item-danger' :
                                    '')
                        )
                        }
                        key={answer.id}
                    >
                        <span className="alert alert-secondary pt-1 pb-1 pr-2 pl-2 mr-2">
                            {String.fromCharCode(ch.charCodeAt(0) + i)}
                        </span>
                        <span className="force-select-all" dangerouslySetInnerHTML={{__html: answer.answer}}/>
                    </li>);
            } else {
                answers.push(
                    <a className={"list-group-item list-group-item-action"
                    + (
                        // Test finished
                        testEnded ? (
                            // This is the correct answer
                            answer.correct ? (
                                    !answer.selected ?
                                        // Correct answer selected
                                        ' list-group-item-warning' :
                                        // Correct answer not selected
                                        ' list-group-item-danger'
                                ) :
                                (answer.selected ?
                                    // Wrong answer selected
                                    ' list-group-item-danger' :
                                    '')
                        ) : (
                            answer.selected ?
                                ' active' :
                                ''
                        )
                    )
                    }
                       id={"list-" + answer.answerId + "-list"}
                       data-toggle="list"
                       role="tab"
                       onClick={() => {
                           if (!testEnded) {
                               this.selectAnswer(answer.id)
                           }
                       }}
                       aria-controls={answer.id}
                       href={"#" + answer.id}
                       key={answer.id}
                    >
                        <span className="alert alert-secondary pt-1 pb-1 pr-2 pl-2 mr-2">
                            {String.fromCharCode(ch.charCodeAt(0) + i)}
                        </span>
                        <span dangerouslySetInnerHTML={{__html: answer.answer}}/>
                    </a>);
            }
        }

        return answers;
    }
}

export default Question;
