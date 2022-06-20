import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import blogService from '../../service/BlogService';
import storage from '../../service/storage';
import Header from '../Header';
import ArticleList from '../ArticleList';
import Article from '../Article';
import Spinner from '../Spinner';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile';

import classes from './App.module.scss';
import 'antd/dist/antd.css';

const App = () => {
  const [data, setData] = useState([]);
  const [totalArticles, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    //console.log('useEffect get logged userdata');
    getLoggedUser();
  }, [loggedIn]);

  useEffect(() => {
    //console.log('useEffect load articles');
    loadArticles(page);
  }, [userData, loggedIn, page]);

  const loadArticles = (page) => {
    blogService.getArticles(page).then((result) => {
      setData(result.articles);
      setTotal(result.articlesCount);
      setLoading(false);
    });
  };
  const updatePage = (newpage) => {
    setPage(newpage);
    loadArticles(newpage);
  };
  const loginSuccess = (user) => {
    console.log('loginSuccess, now logged in');
    setLoggedIn(true);
  };
  const getLoggedUser = () => {
    const token = storage.getFromStorage('token');
    if (token) {
      blogService.getCurrentUser(token).then((result) => {
        setUserData(result.user);
        setLoggedIn(true);
      });
    } else {
      setLoggedIn(false);
    }
  };
  const logOut = () => {
    localStorage.clear();
    getLoggedUser();
  };
  const content = !loading ? (
    <ArticleList data={data} total={totalArticles} page={page} loggedIn={loggedIn} updatePage={updatePage} />
  ) : (
    <Spinner />
  );
  return (
    <div className={classes.wrapper}>
      <Router>
        <Header loggedIn={loggedIn} userData={userData} logOut={logOut} />
        <Switch>
          <Route path="/" render={() => content} exact />
          <Route path="/articles" render={() => content} exact />
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const slug = match.params.slug;
              return <Article slug={slug} data={data} loggedIn={loggedIn} />;
            }}
            exact
          />
          <Route path="/sign-up" component={SignUp} exact />;
          <Route path="/sign-in" render={() => <SignIn loginSuccess={loginSuccess} />} exact />;
          <Route
            path="/profile"
            render={() =>
              loggedIn ? (
                <Profile userData={userData} getLoggedUser={getLoggedUser} loggedIn={loggedIn} />
              ) : (
                <Redirect to="/sign-in" />
              )
            }
            exact
          />
          ;
          <Route render={() => <h2 className={classes.not__found}>This page does not exist</h2>} exact />;
        </Switch>
      </Router>
    </div>
  );
};

export default App;
