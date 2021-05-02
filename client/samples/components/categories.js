import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {API_CATEGORIES_PATH, API_URL, PATH_CATEGORIES, PATH_TEST_GENERATION} from '../common/constants';
import Loading from "./loading";
import Auth from '../Auth/Auth';
import {getGetOptions} from './ApiUtils';

const auth = new Auth();

class Categories extends Component {

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

        let url = `${API_URL}/${API_CATEGORIES_PATH}`;
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

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading || data == null) {
            return <Loading />
        } else {

            // console.log(JSON.stringify(data));

            return (<div className="p-3">
                        <ul className="list-group">
                            {this.createCategories(data)}
                        </ul>
            </div>);
        }
    }

    createCategories(data) {

        let categories = [];
        for (let i = 0; i < data.length; i++) {
            let category = data[i];
            categories.push(
                <li className="list-group-item list-group-item-action" key={category.id}>
                    <div className="d-flex justify-content-between">
                        <div>
                            {category.name}
                        </div>
                        <div>
                            <span className="align-middle">

                                <span className="pl-2"/>
                                <a href={PATH_CATEGORIES + "/" + category.id + "/tests/P"} className="alert alert-warning pt-1 pb-1 pr-2 pl-2" data-toggle="tooltip" data-placement="left" title={category.pendingTests + " pending tests"}>{category.pendingTests}</a>

                                <span className="pl-2"/>
                                <a href={PATH_CATEGORIES + "/" + category.id + "/tests/C"} className="alert alert-primary pt-1 pb-1 pr-2 pl-2" data-toggle="tooltip" data-placement="left" title={category.completedTests + " completed tests"}>{category.completedTests}</a>

                                <span className="pl-2"/>
                                <a href={PATH_CATEGORIES + "/" + category.id + "/templates"}>
                                    <i className="fa fa-layer-group fa-lg" data-toggle="tooltip" data-placement="left" title="Templates"/>
                                </a>

                                <span className="pl-2"/>
                                <a href={PATH_CATEGORIES + "/" + category.id + "/stats"}>
                                    <i className="fas fa-chart-line fa-lg" data-toggle="tooltip" data-placement="left" title="Stats"/>
                                </a>

                                {!auth.isActing() && (<span>
                                    <span className="pl-2"/>
                                    <Link to={PATH_TEST_GENERATION + "/" + category.id}>
                                        <i className={"fas fa-plus fa-lg" + (auth.isActing() ? " text-secondary" : "")} data-toggle="tooltip" data-placement="left" title="Create a new test"/>
                                    </Link>
                                </span>)}
                            </span>
                        </div>
                    </div>
                </li>);
        }

        return categories;
    }
}

export default Categories;