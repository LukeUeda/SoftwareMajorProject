import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";

class Day extends Component {

    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    };

    render() {
        return (
            <div style={{height:"700px"}}>
                {[...Array(48)].map(i =>{
                    return <Cell></Cell>
                    })
                }
            </div>
        );
    }
}

export default Day;