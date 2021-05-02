import React, {Component} from 'react';
// import {Link} from 'react-router-dom';

class HighlightUI extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <div class="modal fade" id="highlightUi" tabindex="-1" aria-labelledby="task setter" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Select Action</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-dark">Clear</button>
                                        <button type="button"
                                                className="btn btn-primary"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                data-toggle="modal"
                                                data-target="#parameters">Add Task
                                        </button>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="..." alt="Second slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="..." alt="Third slide"/>
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