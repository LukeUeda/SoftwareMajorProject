import React, {Component} from 'react';
// import {Link} from 'react-router-dom';

function ModalHeader(props){
    return (
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Highlighted Section: {props.period}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

function ClearTaskSelect(props){
    return(
        <>
            <div className="modal-body">
                <label>Select Action</label>
            </div>
            <div className="modal-footer modal-dialog-centered container">
                <button className="btn btn-block btn-dark col-sm"
                    onClick={() => {
                        props.parent.setState({selectionEvent: "Free", submit: true})
                    }}>Clear</button>
                <button className="btn btn-block btn-primary col-sm"
                        data-slide="next"
                        href="#highlightUI">Add Task</button>
            </div>
        </>
    )
}

function TaskParameters(){
    return(
        <>
            <div className="modal-body">
                <label></label>
            </div>
            <div className="modal-footer modal-dialog-centered container">
                <button className="btn btn-block btn-success col-sm">Submit</button>
            </div>
        </>
    )
}

class HighlightUI extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <div className="modal fade"
                     id="highlightUi"
                     tabindex="-1"
                     aria-labelledby="task setter"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content carousel slide" id="highlightUI">
                            <ModalHeader period={"2:30am to 6:30pm"}/>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <ClearTaskSelect parent={this.props.parent}/>
                                </div>
                                <div className="carousel-item">
                                    <TaskParameters parent={this.props.parent}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HighlightUI;