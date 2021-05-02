import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './App.css';
import Categories from "./components/categories";

class App extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                {
                    !isAuthenticated() && (

                        <div className="container pt-3">
                            <p className="text-center">
                                <Button
                                    id="qsLoginBtn"
                                    bsStyle="primary"
                                    className="btn-margin"
                                    onClick={this.login.bind(this)}
                                >
                                    Log In
                                </Button>
                            </p>
                        </div>
                    )
                }
                {
                    isAuthenticated() && (
                        <Categories />
                    )
                }
            </div>
        );
    }
}

export default App;
