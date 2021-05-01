import React, {Component} from 'react';
import {API_QUESTIONS_PATH, API_URL, PATH_CATEGORIES} from '../common/constants';
import Loading from "./loading";
import QuestionTemplateAlwaysTestSwitch from "./question_template_always_test_switch";
import {getGetOptions} from "./ApiUtils";

export default class QuestionSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
        this.regenerate = this.regenerate.bind(this);
    };

    componentDidMount() {

        this.setState({isLoading:true});
        const { params } = this.props.match;

        let url = `${API_URL}${API_QUESTIONS_PATH}/${params.id}/sample`;

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

    regenerate(event) {
        window.location.reload();
    }

    render() {

        const { data, isLoading, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading || data == null) {
            return <Loading />
        } else {

            // console.log(JSON.stringify(data));

            return (<div className="p-3">
                <div className="card card-default mb-3">

                    <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <div>
                                {data.category} Sample Question {data.questionTemplateId}
                                <span className="pl-3 force-select-all">{data.questionSummary}</span>
                            </div>
                            <div>
                                <QuestionTemplateAlwaysTestSwitch id={data.questionTemplateId} checked={data.alwaysTest}/>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div>
                            <div className="alert alert-primary">
                                <span dangerouslySetInnerHTML={{__html: data.question}}/>
                            </div>
                        </div>

                        {this.createHint(data)}

                        <div>
                            <div className="list-group">
                                {this.createAnswers(data)}
                            </div>
                        </div>
                    </div>


                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-primary" onClick={this.regenerate.bind(this)}>Regenerate</button>
                        &nbsp;
                        <a className="btn btn-primary" href={PATH_CATEGORIES + '/' + data.categoryId + '/stats'} role="button">Go to Stats</a>
                        &nbsp;
                        <a className="btn btn-primary" href={PATH_CATEGORIES + '/' + data.categoryId + '/templates'} role="button">Go to Templates</a>
                    </div>
                </div>

            </div>);
        }
    }

    createHint(data) {

        if (data.hint == null) {
            return "";
        }

        return <div id="hint" className="alert alert-danger text-left" role="alert">
                    <span dangerouslySetInnerHTML={{__html: data.hint}}/>
                </div>;
    }

    createAnswers() {

        const {data} = this.state;

        let ch = 'A';
        let answers = [];
        for (let i = 0; i < data.answers.length; i++) {
            let answer = data.answers[i];
            answers.push(
                <li className={"list-group-item" + (answer.correct ? ' list-group-item-success': '')}
                    key={answer.id}
                >
                    <span className="alert alert-secondary pt-1 pb-1 pr-2 pl-2 mr-2">
                        {String.fromCharCode(ch.charCodeAt(0) + i)}
                    </span>
                    <span className="force-select-all" dangerouslySetInnerHTML={{__html: answer.answer}}/>
                </li>);
        }

        return answers;
    }
}
