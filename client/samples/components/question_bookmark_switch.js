import React, {Component} from 'react';
import {API_QUESTIONS_PATH, API_URL} from "../common/constants";
import {getPostOptions} from "./ApiUtils";

export default class QuestionBookmarkSwitch extends Component {

    constructor(props) {
        super(props);
        this.state = { checked: this.props.checked };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {

        this.setState({ checked });
        console.log("id: ", this.props.id, " checked:", checked);

        let url = `${API_URL}${API_QUESTIONS_PATH}/${this.props.id}/bookmark/${checked}`;

        let apiConfig = getPostOptions();

        console.log("URL is is :", url);

        fetch(url, apiConfig)
            .then(response => response)
            .catch(
                error => {
                    console.error( error);
                    alert("Failed to update the bookmark flag");
                    this.setState({ checked: !checked });
                }
            );
    }

    render() {

        return (
            <span title="Bookmark This Test">
                <a href={"#bookmark"}
                   onClick={() => {
                       this.handleChange(!this.state.checked)
                   }}>
                    <i className={
                        (this.state.checked ? "fas fa-bookmark fa-lg text-warning" : "far fa-bookmark fa-lg text-muted")}
                        data-toggle="tooltip"
                       data-placement="left"
                       title={this.state.checked ? "Un-bookmark" : "Bookmark"}/>
                </a>
            </span>
        );
    }
}
