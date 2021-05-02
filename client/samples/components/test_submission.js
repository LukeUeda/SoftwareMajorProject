import React, {Component} from 'react';
import {Redirect} from 'react-router'

import {API_PATCH_CONFIG, API_TESTS_PATH, API_URL, PATH_TESTS} from '../common/constants';
import Loading from "./loading";

class TestSubmission extends Component {

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

        API_PATCH_CONFIG.body = `{"id":${params.id},"endTime":"${new Date().getTime()}"}`;

        // console.info(`Updating test...`, API_PATCH_CONFIG.body);

        fetch(url, API_PATCH_CONFIG)
            .then(response => response)
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
        const { params } = this.props.match;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading || data == null) {
            return <Loading />
        } else {

            console.log(data);

            return <Redirect to={PATH_TESTS + "/" + params.id}/>
        }
    }

}

export default TestSubmission;