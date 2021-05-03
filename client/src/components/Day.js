import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";

class Day extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
        };
    };

    render() {
        return (
            <div style={{height:"720px"}}>
                {[...Array(48)].map((value, index) => {
                        return <Cell parent={this} day={this.props.index} index={index}></Cell>;})}
            </div>
        );
    }
}

export default Day;