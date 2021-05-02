import React, {Component} from 'react';
import Switch from "react-switch";
import {API_QUESTIONS_PATH, API_URL} from "../common/constants";
import Auth from "../Auth/Auth";
import {getPostOptions} from "./ApiUtils";

const auth = new Auth();

export default class QuestionTemplateAlwaysTestSwitch extends Component {

    constructor(props) {
        super(props);
        this.state = { checked: this.props.checked };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {

        this.setState({ checked });
        // console.log("id: ", this.props.id, " checked:", checked);

        let url = `${API_URL}${API_QUESTIONS_PATH}/${this.props.id}/alwaysTest/${checked}`;

        let apiConfig = getPostOptions();

        console.log("Username is :", apiConfig.headers.username);

        fetch(url, apiConfig)
            .then(response => response)
            .catch(
                error => {
                    console.error( error);
                    alert("Failed to update the repeat flag");
                    this.setState({ checked: !checked });
                }
            );
    }

    render() {

        return (
            <span title="Repeat This Test">
                <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                    id={"switch-" + this.props.id}
                    className="react-switch"
                    height={20}
                    disabled={!auth.isActing()}
                    width={40}
                />
            </span>
        );
    }
}
