import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";

class Day extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    };

    render() {
        return (
            <div style={{height:"720px"}}>
                {[...Array(48)].map((value, index) => {
                        return <Cell parent={this} val={index}></Cell>;})}
            </div>
        );
    }
}

export default Day;