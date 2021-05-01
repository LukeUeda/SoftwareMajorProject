import React, {Component} from 'react';

import {API_CATEGORIES_PATH, API_URL, PATH_QUESTIONS} from '../common/constants';
import CategoryResults from "./category_results";
import CategoryConfig from "./category_config";
import QuestionTemplateAlwaysTestSwitch from "./question_template_always_test_switch";
import QuestionTemplateSuspendedSwitch from "./question_template_suspended_switch";
import Loading from "./loading";

import {getGetOptions} from "./ApiUtils";

const numeral = require('numeral');
const moment = require('moment');

class CategoryStats extends Component {

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

        let url = `${API_URL}${API_CATEGORIES_PATH}/${params.id}/stats`;
        console.info(`Fetching from ${url}...`);

        let apiConfig = getGetOptions();

        console.log("Username is :", apiConfig.headers.username);

        fetch(url, apiConfig)
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
                        {data.categoryName} - {data.questionTemplates.length} Questions
                    </div>

                    <div className="card-body">

                        <CategoryConfig data={data}/>

                        <CategoryResults data={data}/>

                        <table className="table-sm table-striped table-bordered table-responsive-sm" cellSpacing="0" style={{"width":"100%"}}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="text-right">#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" className="text-right">Created</th>
                                    <th scope="col" className="text-right">Last Answered</th>
                                    <th scope="col" className="text-right">Completed</th>
                                    <th scope="col" className="text-right">Rate</th>
                                    <th scope="col" className="text-left">Last 5</th>
                                    <th scope="col" className="text-right">Last 5 Rate</th>
                                    <th scope="col" className="text-center">Repeat</th>
                                    <th scope="col" className="text-center">Suspended</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTemplates(data)}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>);
        }
    }

    createTemplates() {

        const {data} = this.state;

        let templates = [];

        for (let i = 0; i < data.questionTemplates.length; i++) {

            let template = data.questionTemplates[i];

            const percentage = template.correctAnswers / template.completedQuestions;
            let colorType = null;
            if (percentage === 1) {
                colorType = 'success'
            } else if (percentage >= 0.75) {
                colorType = 'primary';
            } else if (percentage >= 0.5) {
                colorType = 'warning';
            } else {
                colorType = 'danger'
            }

            const lastTestsPercentage = template.lastTestsSuccessRate;
            let lastTestsColorType = null;
            if (lastTestsPercentage === 100) {
                lastTestsColorType = 'success'
            } else if (lastTestsPercentage >= 0.75) {
                lastTestsColorType = 'primary';
            } else if (lastTestsPercentage >= 0.5) {
                lastTestsColorType = 'warning';
            } else {
                lastTestsColorType = 'danger'
            }

            templates.push(
                <tr key={template.id}>
                    <th scope="row" className="text-right">
                        <a href={PATH_QUESTIONS + '/' + template.id + '/sample'} key={template.id} className={"btn" + (template.active !== true ? " disabled" : "")}>
                            {(template.active !== true ? "(" : "") + template.id + (template.active !== true ? ")" : "")}
                        </a>
                    </th>
                    <td>{template.summary}</td>
                    <td className="text-right">
                        {template.createdTime != null && (moment(template.createdTime).format('DD/MM/YYYY HH:mm'))}
                    </td>
                    <td className="text-right">
                        {template.lastCompleted != null && (moment(template.lastCompleted).format('DD/MM/YYYY HH:mm'))}
                    </td>
                    <td className="text-right">{template.completedQuestions}</td>
                    <td className="text-right">
                        <span   className={"badge badge-pill badge-" + colorType}
                                data-toggle="tooltip"
                                data-placement="left"
                                title={numeral(percentage).format('0%')}>
                            {numeral(percentage).format('0%')}
                        </span>
                    </td>
                    <td className="text-left">
                        {this.createLastTestResults(template.lastTestResults)}
                    </td>
                    <td className="text-right">
                        {lastTestsPercentage !== null && (
                            <span   className={"badge badge-pill badge-" + lastTestsColorType}
                                    data-toggle="tooltip"
                                    data-placement="left"
                                    title={numeral(lastTestsPercentage).format('0%')}>
                            {numeral(lastTestsPercentage).format('0%')}
                        </span>
                        )}
                    </td>
                    <td className="text-center align-middle">
                        <QuestionTemplateAlwaysTestSwitch id={template.id} checked={template.alwaysTest}/>
                    </td>
                    <td className="text-center align-middle">
                        <QuestionTemplateSuspendedSwitch id={template.id} checked={template.suspended}/>
                    </td>
                </tr>
            );
        }

        return templates;
    }

    createLastTestResults(results) {

        let data = [];

        for (let i = 0; results && i < results.length; i++) {
            let result = results[i];
            let first = i === 0;
            data.push(<span>
                {result.correct ? <i className={"fas fa-check-circle fa-lg text-success" + (!first ? " pl-1" : "")} title={moment(result.endTime).format('DD/MM/YYYY HH:mm')}/> : <i className={"fas fa-times-circle fa-lg text-danger" + (!first ? " pl-1" : "")} title={moment(result.endTime).format('DD/MM/YYYY HH:mm')}/>}
            </span>);
        }

        return data;
    }
}

export default CategoryStats;
