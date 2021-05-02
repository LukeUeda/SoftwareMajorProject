import React, {Component} from 'react';


class TaskParameterUI extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <div class="modal fade" id="parameters" tabindex="-1" aria-labelledby="task setter" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Options</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark">Clear</button>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#parameters">Add Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskParameterUI;