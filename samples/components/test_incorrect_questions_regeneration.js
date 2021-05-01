import React, {Component} from 'react';
import {Redirect} from 'react-router'

import {API_POST_CONFIG, API_TESTS_PATH, API_URL, PATH_TESTS} from '../common/constants';
import Loading from "./loading";

export default class TestIncorrectQuestionsRegeneration extends Component {

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

        let url = `${API_URL}${API_TESTS_PATH}/${params.id}/regenerateIncorrectQuestions`;
        console.info(`Posting to ${url}...`);

        fetch(url, API_POST_CONFIG)
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

        // console.log('Generating test with properties', this.props);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading || data == null) {
            return <Loading />
        } else {

            console.log(JSON.stringify(data));

            return <Redirect to={PATH_TESTS + "/" + data.id}/>
        }
    }

}
