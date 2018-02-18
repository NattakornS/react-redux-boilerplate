import React, { Component } from 'react';
import { NavItem, Navbar, Nav } from 'react-bootstrap';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../scss/style.scss';

import PageError from '../containers/statusCode_pageError';

// import Authentication
import Signin from '../containers/auth/signin';
import Signout from '../containers/auth/signout';
import Signup from '../containers/auth/signup';
import RequireAuth from '../containers/auth/require_auth';

import Header from '../containers/header';

class App extends Component {
    render() {

        return (

            <div className="container-fluid" style={{ padding: 0 }}>
                <div style={{ marginBottom: 60 }}>
                    <Header {...this.props} />
                </div>
                <div className="content-body">
                    <Switch>
                        <Route path='/page1' component={()=><div><h1>Page1</h1></div>} />
                        <Route path='/page2' component={()=><div><h1>Page2</h1></div>} />
                        <Route path='/page3' component={()=><div><h1>Page3</h1></div>} />
                        <Route path='/signin' component={Signin} />
                        <Route path='/signup' component={RequireAuth(Signup)} />
                        <Route path='/signout' component={Signout} />
                    </Switch>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default withRouter(connect(mapStateToProps)(App));
// export default App;
