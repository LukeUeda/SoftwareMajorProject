import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#FFFFFF",
            toggle: "",
            target: ""
        };
    };

    cellFunction(){
        if (this.props.parent.state.sectionStart == null){
            this.setState({
                color:"#00FF00",
                target: "",
                toggle: ""
            });
            this.props.parent.setState({sectionStart: this})
        }else{
            this.props.parent.setState({sectionEnd: this})

            this.setState({
                color:"#FF0000",
                target: "#highlightUi",
                toggle: "modal"
            });
        }
    }

    render() {
        return (
            <div
                className="border"
                data-toggle={this.state.toggle}
                data-target={this.state.target}
                style={{height: "15px", backgroundColor: this.state.color}}
                onClick={
                    this.cellFunction.bind(this)
                }
            />
        );
    }
}

export default Cell;