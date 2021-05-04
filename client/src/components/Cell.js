import React, {Component} from 'react';

// import {Link} from 'react-router-dom';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#FFFFFF",
            start: props.index/2,
            end: (props.index + 1)/2,
        };
    };

    cellFunction(){
        this.props.cellFunc(this)
    }

    render() {
        return (
            <div
                style={{height: "15px", backgroundColor: this.state.color}}
                onClick={
                    this.cellFunction.bind(this)
                }
            />
        );
    }
}

export default Cell;