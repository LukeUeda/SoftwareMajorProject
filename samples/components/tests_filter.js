import React, {Component} from 'react';

import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import {PATH_CATEGORIES} from "../common/constants";

export default class TestsFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryId: this.props.match.params.id,
            status: this.props.match.params.status,
            hideRetests: this.props.match.params.hideRetests === 'true'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {

        this.setState({ hideRetests : checked });
        window.location.href=`${PATH_CATEGORIES}/${this.state.categoryId}/tests/${this.state.status}/${checked}`;
    }

    render() {

        console.log("Hide Retests:", this.state.hideRetests);

        return (
            <div className="align-middle float-right pb-3">
                Hide Retests
                <span title="Hide Retests" className="pl-2">
                    <Switch
                        onChange={this.handleChange}
                        checked={this.state.hideRetests}
                        id={"switch-" + this.props.id}
                        className="react-switch"
                        height={20}
                        width={40}
                        />
                </span>
            </div>
        );
    }
}
