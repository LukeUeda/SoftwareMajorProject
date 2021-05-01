import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import TestsFilter from './tests_filter';

import {API_CATEGORIES_PATH, API_URL, PATH_TESTS} from '../common/constants';
import Loading from "./loading";
import {getGetOptions} from "./ApiUtils";

const numeral = require('numeral');
const moment = require('moment');

class Tests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    };

    componentDidMount() {

        this.setState({isLoading:true});

        const { params } = this.props.match;

        let url = `${API_URL}${API_CATEGORIES_PATH}/${params.id}/tests?status=${params.status}&hideRetests=${params.hideRetests === 'true'}`;
        console.info(`Fetching from ${url}...`);

        // API_GET_CONFIG.headers.username = localStorage.getItem('username');

        let apiConfig = getGetOptions();

        console.log("Username is :", apiConfig.headers.username);

        fetch(url, apiConfig)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data, isLoading: false })
            })
            .catch(
                error => {
                    console.error(error);
                    // throw error;
                    this.setState({ error, isLoading: false })
                }
            );
    }

    render() {

        const { data, isLoading, error } = this.state;
        const { params } = this.props.match;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading || data == null) {
            return <Loading />
        } else {

            console.log(JSON.stringify(data));

            return (
                <div className="p-3">
                    <div className="card card-default">
                        <div className="card-header">
                            {data.categoryName} {params.status === "C" ? "Completed" : "Pending"} Tests
                        </div>

                        <div className="card-body">

                            <TestsFilter {...this.props} />

                            <table className="table-sm table-striped table-bordered table-responsive-sm" cellSpacing="0" style={{"width":"100%"}}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" className="text-right">#</th>
                                        <th scope="col" className="text-right">Started</th>
                                        <th scope="col" className="text-right">Completed</th>
                                        <th scope="col" className="text-right">Took</th>
                                        <th scope="col" className="text-right">Questions</th>
                                        <th scope="col" className="text-right">Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.createTests()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }

    createTests() {

        const {data} = this.state;

        let tests = [];
        for (let i = 0; i < data.tests.length; i++) {

            let test = data.tests[i];

            let percentage = test.correctAnswers / test.totalQuestions;

            // console.info("percentage ", percentage);

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

            // console.info("Colour type ", colorType);

            let diff = '-';
            if (test.endTime != null) {
                let msec = moment(test.endTime) - moment(test.startTime);

                // let hh = Math.floor(msec / 1000 / 60 / 60);
                // hh = (hh < 10 ? '0' : '') + hh;
                // msec -= hh * 1000 * 60 * 60;
                let mm = Math.floor(msec / 1000 / 60);
                mm = (mm < 10 ? '0' : '') + mm;
                msec -= mm * 1000 * 60;
                let ss = Math.floor(msec / 1000);
                ss = (ss < 10 ? '0' : '') + ss;
                msec -= ss * 1000;

                diff = mm + ":" + ss
            }

            tests.push(
                    <tr key={test.id}>
                        <th scope="row" className="text-right">
                            <a href={PATH_TESTS + '/' + test.id} key={test.id}>
                                {(test.retest ? '(Re:' + test.originalTestId + ')' : '') + ' ' + test.id}
                            </a>
                        </th>
                        <td className="text-right">
                            {moment(test.startTime).format('DD/MM/YYYY HH:mm')}
                        </td>
                        <td className="text-right">
                            {
                                test.endTime == null && ('-')
                            }
                            {
                                test.endTime != null && (moment(test.endTime).format('DD/MM/YYYY HH:mm'))
                            }
                        </td>
                        <td className="text-right">
                            {diff}
                        </td>
                        <td className="text-right">{test.totalQuestions}</td>
                        <td className="text-right">
                            {
                                test.endTime != null && ( <span   className={"badge badge-pill badge-" + colorType}
                                    data-toggle="tooltip"
                                    data-placement="left"
                                    title={numeral(percentage).format('0%')}>
                                                {numeral(percentage).format('0%')}
                                        </span>
                                )
                            }
                        </td>
                    </tr>
                );
        }

        return tests;
    }

    redirect = (test) => {
        return <Redirect to={PATH_TESTS + "/" + test.id}/>
    }
}

export default Tests;