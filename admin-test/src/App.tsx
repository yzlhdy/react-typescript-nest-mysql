import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'

import { GlobalStyle } from './styles/GlobalStyles'
import Login from './views/Login'
import Admin from './views/Admin'


function App() {
  return (
    <>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen />
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
