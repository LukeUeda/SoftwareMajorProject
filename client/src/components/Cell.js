import React, {Component} from 'react';

// import {Link} from 'react-router-dom';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#FFFFFF",
            start: '9:30',
            end: '13:00'
        };
    };

    cellFunction(){
        this.props.cellFunc(this)
    }

    render() {
        return (
            <div
                className="border"
                style={{height: "15px", backgroundColor: this.state.color}}
                onClick={
                    this.cellFunction.bind(this)
                }
            />
        );
    }
}

export default Cell;