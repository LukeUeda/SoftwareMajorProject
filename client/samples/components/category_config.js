import React, {Component} from 'react';
import {API_CATEGORIES_PATH, API_URL, DEFAULT_NO_OF_QUESTIONS} from "../common/constants";
import Auth from "../Auth/Auth";
import {getPostOptions} from "./ApiUtils";

const auth = new Auth();

export default class CategoryConfig extends Component {

    constructor(props) {
        super(props);
        this.handleNoOfQuestionsChange = this.handleNoOfQuestionsChange.bind(this);
    }

    render() {

        let noOfQuestions = this.props.data.userAttribute !== null ? this.props.data.userAttribute.noOfQuestions : null;
        if (noOfQuestions === null) {
            noOfQuestions = DEFAULT_NO_OF_QUESTIONS;
        }
        console.log("No of questions:", noOfQuestions);

        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">No of Questions</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01" onChange={this.handleNoOfQuestionsChange} disabled={!auth.isActing()}>
                    {this.createNoOfQuestionsOptions(noOfQuestions)}
                </select>
            </div>
        );
    }

    createNoOfQuestionsOptions(noOfQuestions) {

        let options = [];

        options.push(<option value="1" selected={1 === noOfQuestions}>1</option>);
        options.push(<option value="2" selected={2 === noOfQuestions}>2</option>);
        options.push(<option value="3" selected={3 === noOfQuestions}>3</option>);

        for (let i = 5; i <= 250; i += 5) {
            options.push(<option value={i} selected={i === noOfQuestions}>{i}</option>);
        }

        return options;
    }

    handleNoOfQuestionsChange(event) {

        // this.setState({ checked });
        console.log("Category ID: ", this.props.data.categoryId, " New Number of Questions:", event.target.value);
        // console.log("value:", event.target.value);

        let url = `${API_URL}/${API_CATEGORIES_PATH}/${this.props.data.categoryId}/noOfQuestions/${event.target.value}`;

        let apiConfig = getPostOptions();

        console.log("Username is :", apiConfig.headers.username);

        fetch(url, apiConfig)
            .then(response => response)
            .catch(
                error => {
                    console.error( error);
                    alert("Failed to update the repeat flag");
                    // this.setState({ checked: !checked });
                }
            );
    }
}
