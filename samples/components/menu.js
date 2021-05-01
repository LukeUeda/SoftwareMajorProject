import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {API_URL, API_USERS} from "../common/constants";
import {getAdminGetOptions} from './ApiUtils';

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            profile: null,
            data: null
        };
        this.createUserOptions = this.createUserOptions.bind(this);
        this.changeUser = this.changeUser.bind(this);
    };

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
        window.location = '/';
    }

    componentDidMount() {

        this.setState({profile: null, data: null});

        const {isAuthenticated, getProfile} = this.props.auth;
        // this.setState({ profile: userProfile});

        if (isAuthenticated()) {
            getProfile((err, profile) => {
                // console.log("User profile from getProfile", JSON.stringify(profile));
                this.setState({ profile: profile});


                let url = `${API_URL}${API_USERS}`;
                console.info(`Fetching from ${url}...`);

                fetch(url, getAdminGetOptions())
                    .then(response => response.json())
                    .then(data => {

                            // console.log(JSON.stringify(data));
                            this.setState({profile: profile, data: data});
                        }
                    );

            });
        } else {
            this.setState({profile: null, data: null});
        }
    }

    render() {

        const { profile, data } = this.state;

        let currentActingUsername = localStorage.getItem('acting-username');

        return <div className="pos-f-t">
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/">
                    <i className="fas fa-home fa-lg text-white"/>
                </Link>

                {
                    profile != null && data != null && data.length > 0 && (
                        <select onChange={value => this.changeUser(value)} defaultValue={currentActingUsername}>
                            <option value="">-- Select User --</option>
                            {this.createUserOptions()}
                        </select>
                    )
                }
                {
                    profile != null && (
                        <a
                            href="#logout" onClick={this.logout.bind(this)}
                        >
                            <img src={profile.picture} alt="Logout" style={{width: "30px"}}/>
                        </a>
                    )
                }
            </nav>
        </div>;
    }

    createUserOptions() {

        const { profile, data } = this.state;

        console.log(JSON.stringify(data));

        let users = [];
        for (let i = 0; i < data.length; i++) {
            let user = data[i];

            if (profile.nickname === user.userName) {
                continue;
            }

            users.push(<option key={i} value={user.userName} data-icon="fas fa-user">
                {user.userName}
            </option>);
        }

        return users;
    }

    changeUser(e) {

        let actingUsername = e.target.value;

        console.log("Acting as:" + actingUsername);

        if (actingUsername) {
            localStorage.setItem('acting-username', e.target.value);
        } else {
            localStorage.removeItem('acting-username');
        }

        window.location = '/';
    }
}

export default Menu;
