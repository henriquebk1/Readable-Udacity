import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import Home from './screens/Home';
import NewEdit from './screens/NewEdit';
import PostScreen from './screens/PostScreen';
import LoadingBar from 'react-redux-loading';
import CssBaseline from '@material-ui/core/CssBaseline';
import NotFound from "./screens/NotFound";

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData()
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <CssBaseline/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/edit/:post_id' component={NewEdit}/>
                        <Route exact path='/newPost' component={NewEdit}/>
                        <Route exact path='/notFound' component={NotFound}/>
                        <Route exact path="/:category/:post_id" component={PostScreen}/>
                        <Route exact path="/:category" component={Home}/>
                        <Redirect from='/*' to='/notFound'/>
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default connect(null, {handleInitialData})(App)