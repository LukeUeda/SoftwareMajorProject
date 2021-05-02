import React, {Component} from 'react';

import {API_CATEGORIES_PATH, API_URL, PATH_QUESTIONS} from '../common/constants';
import Loading from "./loading";

import {getGetOptions} from "./ApiUtils";
import { Pagination } from 'react-bootstrap';

const moment = require('moment');

class CategoryTemplates extends Component {

    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
        this.filterByDescription = this.filterByDescription.bind(this);
        this.query = this.query.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    };

    filterByDescription(event) {
        console.log("Filter:", event.target.value);
        this.query(event.target.value)
    }

    query(shortCode) {
        const { params } = this.props.match;
        const authResult = new URLSearchParams(window.location.search);
        let page = authResult.get('page');
        // let name = authResult.get('name');
        if (page === null) {
            page = 1;
        }
        let url = `${API_URL}${API_CATEGORIES_PATH}/${params.id}/templates?page=${page}&pageSize=30`;
        if (shortCode !== null) {
            url = `${url}&shortCode=${shortCode}`;
        }
        console.info(`Fetching from ${url}...`);

        let apiConfig = getGetOptions();

        // console.log("Username is :", apiConfig.headers.username);

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

    componentDidMount() {
        this.setState({isLoading:true});
        this.query(null)
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

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="description">Filter</label>
                            </div>
                            <input className="form-control" id="shortCode" onChange={this.filterByDescription}/>
                        </div>

                        <table className="table-sm table-striped table-bordered table-responsive-sm" cellSpacing="0" style={{"width":"100%"}}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="text-right">#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" className="text-right">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTemplates(data)}
                            </tbody>
                        </table>

                        <Pagination className={"pt-2 d-flex justify-content-center"}>
                            <Pagination.First href={'/categories/' + data.categoryId + '/templates'} disabled={data.paging.previousPage === null}/>
                            <Pagination.Prev href={'/categories/' + data.categoryId + '/templates?page=' + data.paging.previousPage} disabled={data.paging.previousPage === null}/>

                            {this.createPages(data)}

                            <Pagination.Next href={'/categories/' + data.categoryId + '/templates?page=' + (data.paging.nextPage)} disabled={data.paging.nextPage === null}/>
                            <Pagination.Last href={'/categories/' + data.categoryId + '/templates?page=' + (data.paging.totalPages)} disabled={data.paging.nextPage === null}/>
                        </Pagination>
                    </div>

                </div>

            </div>);
        }
    }

    navigateTo(page) {

    }

    createPages() {

        const {data} = this.state;

        let pages = [];
        let currentPage = data.paging.pageNumber;
        pages.push(currentPage);

        if (currentPage - 1 >= 1) {
            pages.unshift(currentPage - 1);
        }
        if (currentPage - 2 >= 1) {
            pages.unshift(currentPage - 2);
        }
        if (currentPage - 3 >= 1) {
            pages.unshift(currentPage - 3);
        }
        if (currentPage - 4 >= 1) {
            pages.unshift(currentPage - 4);
        }

        if (currentPage + 1 <= data.paging.totalPages) {
            if (pages.length === 5) {
                pages.shift();
            }
            pages.push(currentPage + 1);
        }
        if (currentPage + 2 <= data.paging.totalPages) {
            if (pages.length === 5) {
                pages.shift();
            }
            pages.push(currentPage + 2);
        }
        if (pages.length < 5 && currentPage + 3 <= data.paging.totalPages) {
            pages.push(currentPage + 3);
        }
        if (pages.length < 5 && currentPage + 4 <= data.paging.totalPages) {
            pages.push(currentPage + 4);
        }

        if (pages[0] !== 1) {
            pages.unshift("...")
        }
        if (data.paging.totalPages !== 0 && pages[pages.length - 1] !== data.paging.totalPages) {

            if (pages[pages.length - 1] !== data.paging.totalPages - 1) {
                pages.push("...")
            }
            pages.push(data.paging.totalPages)
        }

        // console.log(pages);


        let pageItems = [];
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];

            if (page === "...") {
                pageItems.push(<Pagination.Ellipsis disabled/>)
            } else {
                pageItems.push(<Pagination.Item href={'/categories/' + data.categoryId + '/templates?page=' + page} disabled={page === data.paging.pageNumber}>{page}</Pagination.Item>);
            }
        }

        return pageItems;
    }

    createTemplates() {

        const {data} = this.state;

        let templates = [];

        for (let i = 0; i < data.questionTemplates.length; i++) {

            let template = data.questionTemplates[i];

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
                </tr>
            );
        }

        return templates;
    }
}

export default CategoryTemplates;
