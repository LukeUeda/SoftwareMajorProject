import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";

class Day extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sectionStart: null,
            sectionEnd: null,
        };
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.sectionEnd != this.state.sectionEnd) {
            console.log(this.state.sectionStart, this.state.sectionEnd)
        }
    }

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