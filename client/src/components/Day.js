import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";

class Day extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            start: '',
            end:  '',
        };
    };

    render() {
        return (
            <div style={{height:"720px"}}>
                {[...Array(48)].map((value, index) => {
                        return <Cell cellFunc={this.props.cellFunc} index={index} par={this.state.index}/>;})}
            </div>
        );
    }
}

export default Day;