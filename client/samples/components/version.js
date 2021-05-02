import React, {Component} from 'react';
import version from '../version.json';

export default class Version extends Component {

    render() {

        return <div className="alert alert-primary">
            <em>
                <small>
                    Version: {version['git.build.version']},
                    Last Modified: {version['git.commit.time']},
                    Commit: {version['git.commit.id.abbrev']},
                    Build #: {version['git.build.number']},
                    Build Time: {version['git.build.time']}
                </small>
            </em>
        </div>;
    }
}
