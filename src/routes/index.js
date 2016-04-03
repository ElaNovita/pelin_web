import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import GroupRoute from './group'

import App from '../components/App'
import Home from '../pages/user/Home'

import MyProfile from '../pages/user/MyProfile'
import UserDetail from '../pages/user/UserDetail'
import MyAssignment from '../pages/user/MyAssignment'
import Notifications from '../pages/user/Notifications'

import MessageContainer from '../pages/message/MessageContainer'
import MessageList from '../pages/message/MessageList'
import MessageDetail from '../pages/message/MessageDetail'

import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import About from '../pages/other/About'

const routes = (
    <Router history={hashHistory}>
        <Route name="app-route" path="/" component={App}>
            <IndexRoute component={Home} />

            {GroupRoute}

            <Route name="my-profile" path="me" component={MyProfile} />
            <Route name="user-detail" path="users/:userId" component={UserDetail} />
            <Route name="my-assignment" path="assignments" component={MyAssignment} />
            <Route name="notifications" path="notifications" component={Notifications} />

            <Route path="messages" component={MessageContainer}>
                <IndexRoute component={MessageList} />
                <Route name="message-detail" path=":messageId" component={MessageDetail} />
            </Route>


            <Route name="about" path="about" component={About} />
        </Route>

        <Route name="login" path="/login" component={Login} />
        <Route name="signup" path="/signup" component={Signup} />
    </Router>
);

export default routes
