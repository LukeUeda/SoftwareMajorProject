import React, {Component} from 'react';
import {Redirect} from 'react-router'

import {API_TESTS_PATH, API_URL} from '../common/constants';
import Loading from "./loading";
import {getDeleteOptions} from "./ApiUtils";

class TestDeletion extends Component {

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
        console.info(`Deleting test ${url}...`);

        let apiConfig = getDeleteOptions();

        console.log("Username is :", apiConfig.headers.username);

        fetch(url, apiConfig)
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

            // console.log(JSON.stringify(data));

            return <Redirect to={"/"}/>
        }
    }

}

export default TestDeletion;
