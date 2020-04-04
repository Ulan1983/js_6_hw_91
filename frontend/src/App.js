import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Register from "./containers/Register/Register";
import Profile from "./containers/Profile/Profile";
import Edit from "./containers/Profile/Edit";

function App() {
  return (
      <div className="App">
        <Toolbar/>
        <Switch>
          <Route path='/' exact component={MainPage}/>
          <Route path='/profile' exact component={Profile}/>
          <Route path='/profile/edit' exact component={Edit}/>
          <Route path="/register" exact component={Register}/>
          <Route render={() => <h1>Not found</h1>}/>
        </Switch>
      </div>
  );
}

export default App;

