import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BookList from './book/BookList';
import BookSearch from './book/BookSearch'

class Routes extends Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" render={() => (<BookList />)} />
          <Route path="/search" render={(routeProps) => (<BookSearch {...routeProps} />)} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  };
}

export default Routes;