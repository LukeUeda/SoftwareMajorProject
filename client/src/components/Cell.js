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
            this.props.parent.setState({sectionStart: this.props.index, selectionDay: this.props.day})
        }else{
            if(this.props.parent.state.selectionDay != this.props.day) {
                console.log("Nope")
                this.setState({
                   toggle:"popover",
                });
            }
            else{
                this.props.parent.setState({sectionEnd: this.props.index})

                this.setState({
                    color:"#FF0000",
                    target:"#highlightUi",
                    toggle:"modal"
                });
            }
        }
    }

    render() {
        return (
            <div
                className="border"
                type="button"
                data-toggle={this.state.toggle}
                data-target={this.state.target}
                data-placement="right"
                data-trigger="focus"
                data-content="Please select within same day."
                style={{height: "15px", backgroundColor: this.state.color}}
                onClick={
                    this.cellFunction.bind(this)
                }
            />
        );
    }
}

export default Cell;