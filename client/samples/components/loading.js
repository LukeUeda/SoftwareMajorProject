import React, {Component} from 'react';

export default class Loading extends Component {

    render() {
        return <div id="circle">
                    <div className="loader">
                        <div className="loader">
                            <div className="loader">
                                <div className="loader">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
    }
}
