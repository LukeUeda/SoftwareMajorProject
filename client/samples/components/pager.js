import React, {Component} from 'react';

import {PATH_QUESTIONS} from '../common/constants';


class Pager extends Component {

    handleScroll(e) {

        let key;

        switch (e.keyCode) {
            // case 40:
            //     key = 'down';
            //     break;
            // case 38:
            //     key = 'up';
            //     break;
            case 37:
                key = 'left';
                break;
            case 39:
                key = 'right';
                break;
            // case 27:
            //     key = 'enter';
            //     break;
            default:
        }

        // console.log("key: ", key);

        if (key) {

            let firstQuestionId = this.props.data.firstQuestionId;
            let questionId = this.props.data.id;
            let lastQuestionId = this.props.data.lastQuestionId;

            if (key === 'left' && questionId !== firstQuestionId) {
                window.location=`${PATH_QUESTIONS}/${questionId - 1}`;
            } else if (key === 'right' && questionId !== lastQuestionId) {
                window.location=`${PATH_QUESTIONS}/${questionId + 1}`;
            }
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", e => this.handleScroll(e));
    };

    render() {

        const firstQuestionId = this.props.data.firstQuestionId;
        const questionId = this.props.data.id;
        const lastQuestionId = this.props.data.lastQuestionId;
        const totalQuestions = this.props.data.totalQuestions;

        const questionIndex = questionId - firstQuestionId + 1;

        return <div>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: questionIndex / totalQuestions * 100 + "%"}}
                             aria-valuenow={questionIndex / totalQuestions * 100} aria-valuemin="0" aria-valuemax="100"/>
                    </div>

                    <ul className="pagination pagination-sm justify-content-end mt-3">
                        <li className={"page-item" + (questionId === firstQuestionId ? ' disabled' : '')}>
                            <a className="page-link" href={PATH_QUESTIONS + '/' + (questionId - 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>

                        <li className={"page-item" + (questionId === lastQuestionId ? ' disabled' : '')}>
                            <a className="page-link" href={PATH_QUESTIONS + '/' + (questionId + 1)} aria-label="Next" key={questionId + 1}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>

                </div>;
    }
}

export default Pager;
