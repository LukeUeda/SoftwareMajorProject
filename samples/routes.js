import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Menu from "./components/menu";
import Tests from "./components/tests";
import TestGeneration from "./components/test_generation";
import TestSubmission from "./components/test_submission";
import TestRegeneration from "./components/test_regeneration";
import TestIncorrectQuestionsRegeneration from "./components/test_incorrect_questions_regeneration";
import Test from "./components/test";
import Question from "./components/question";
import CategoryStats from "./components/category_stats";
import CategoryTemplates from "./components/category_templates";
import QuestionSample from "./components/question_sample";
import TestDeletion from "./components/test_deletion";
import Version from "./components/version";

const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
};

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <div>
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>

                <Route exac path="/" render={props => <Menu auth={auth} {...props} />} />
                <Switch>

                    <Route path="/categories/:id/tests/:status/:hideRetests?" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <Tests auth={auth} {...props} />}/>
                    <Route path="/categories/:id/stats" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <CategoryStats auth={auth} {...props} />}/>
                    <Route path="/categories/:id/templates" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <CategoryTemplates auth={auth} {...props} />}/>
                    <Route path="/tests/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <Test auth={auth} {...props} />}/>
                    <Route path="/questions/:id/sample" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <QuestionSample auth={auth} {...props} />}/>
                    <Route path="/questions/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <Question auth={auth} {...props} />}/>
                    <Route path="/testGeneration/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <TestGeneration auth={auth} {...props} />}/>
                    <Route path="/testSubmission/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <TestSubmission auth={auth} {...props} />}/>
                    <Route path="/testRegeneration/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <TestRegeneration auth={auth} {...props} />}/>
                    <Route path="/testIncorrectQuestionsRegeneration/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <TestIncorrectQuestionsRegeneration auth={auth} {...props} />}/>
                    <Route path="/testDeletion/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/"/> : <TestDeletion auth={auth} {...props} />}/>

                    <Route exac path="/" render={(props) => <App auth={auth} {...props} />} />
                </Switch>

                <div className="container pt-3">
                    <p className="text-center">
                        <Version />
                    </p>
                </div>
            </div>
        </Router>
    );
};
