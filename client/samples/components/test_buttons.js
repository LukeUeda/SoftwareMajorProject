import React, {Component} from 'react';
import Auth from '../Auth/Auth';

import {
    PATH_TEST_DELETION,
    PATH_TEST_INCORRECT_QUESTIONS_REGENERATION,
    PATH_TEST_REGENERATION,
    PATH_TEST_SUBMISSION
} from '../common/constants';

const auth = new Auth();

export default class TestButtons extends Component {

    render() {

        const endTime = this.props.data.endTime;
        const totalQuestions = this.props.data.totalQuestions;
        const correctAnswers = this.props.data.correctAnswers;

        let unansweredQuestions = false;

        for (let i = 0; i < this.props.data.questions.length; i++) {
            let question = this.props.data.questions[i];
            if (!question.answered) {
                unansweredQuestions = true;
                break;
            }
        }

        console.log("totalQuestions", totalQuestions);
        console.log("correctAnswers", correctAnswers);
        console.log("unansweredQuestions", unansweredQuestions);

        return (<div>
            <div className="modal fade" id="confirmationDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="confirmationDeleteModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">You are about to delete this test</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this test?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <a role="button" className="btn btn-danger" href={PATH_TEST_DELETION + '/' + this.props.data.id}>Delete</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="confirmationSubmitModal" tabIndex="-1" role="dialog" aria-labelledby="confirmationSubmitModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">You have unanswered questions</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            There are still unanswered questions.<br/>
                            <br/>
                            Are you sure you still want to submit?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <a role="button" className="btn btn-primary" href={PATH_TEST_SUBMISSION + '/' + this.props.data.id}>Still Submit</a>
                        </div>
                    </div>
                </div>
            </div>

            {
                // Not submitted yet.
                endTime == null && (<button type="button" className="btn btn-danger mr-2" data-toggle="modal" data-target="#confirmationDeleteModal">
                    Delete
                </button>)
            }

            {
                // Not submitted yet with unanswered questions
                endTime == null && unansweredQuestions && (<button type="button" className={"btn btn-primary" + (auth.isActing() ? " disabled" : "")}
                                                                   data-toggle="modal" data-target="#confirmationSubmitModal">
                    Submit
                </button>)
            }

            {
                // Not submitted yet.
                endTime == null && !unansweredQuestions && (<a className={"btn btn-primary" + (auth.isActing() ? " disabled" : "")} href={PATH_TEST_SUBMISSION + '/' + this.props.data.id} role="button">Submit</a>)
            }

            {
                // Completed
                endTime !== null && (<a className={"btn btn-primary mr-2" + (auth.isActing() ? " disabled" : "")} href={PATH_TEST_REGENERATION + '/' + this.props.data.id} role="button">Retest All Questions</a>)
            }

            {
                // Completed and some wrong
                endTime !== null && correctAnswers !== totalQuestions && (<a className={"btn btn-primary" + (auth.isActing() ? " disabled" : "")} href={PATH_TEST_INCORRECT_QUESTIONS_REGENERATION + '/' + this.props.data.id} role="button">Retest Incorrect Questions</a>)
            }
        </div>);
    }
}
