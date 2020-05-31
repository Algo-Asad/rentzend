import React from 'react';
import './App.css';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import {ApolloInstance} from "./apollo";
import {Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom'
import Home from "./components/Home/Home";
import UserList from "./components/UsersList/UsersList";

function App() {
    return (
        <ApolloProvider client={ApolloInstance}>
            <Router>
                <Switch>
                    <Route path={'/list'} component={UserList}/>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'*'} exact>
                        <Redirect to={'/'} />
                    </Route>
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;
