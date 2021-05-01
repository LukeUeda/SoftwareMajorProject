import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";

class Cell extends Component {

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
            <div className="border" style={{height:"2.08%"}}>
            </div>
        );
    }
}

export default Cell;