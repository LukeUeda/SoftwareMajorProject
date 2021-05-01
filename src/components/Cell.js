import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
            color: "#FFFFFF",
            toggle: "",
            target: ""
        };
    };

    cellFunction(){
        if (this.props.parent.state.sectionStart == null){
            this.setState({
                color:"#00FF00",
                target: "#highlightMenu",
                toggle: "modal"
            });
            this.props.parent.setState({sectionStart: this})
        }else{
            this.setState({color:"#FF0000"});
            this.props.parent.setState({sectionEnd: this})
        }
    }

    render() {
        return (
            <div
                className="border"
                data-toggle="modal"
                data-target="#highlightMenu"
                style={{height:"15px", backgroundColor: this.state.color}}
                onClick={
                    this.cellFunction.bind(this)
                }
            ></div>
        );
    }
}

export default Cell;