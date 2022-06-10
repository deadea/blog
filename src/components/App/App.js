import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import blogService from '../../service/BlogService';
import Header from '../Header';
import ArticleList from '../ArticleList';
import Article from '../Article';
import Spinner from '../Spinner';
import SignUp from '../SignUp';
import SignIn from '../SignIn';

import classes from './App.module.scss';
import 'antd/dist/antd.css';

const App = () => {
  const [data, setData] = useState([]);
  const [totalArticles, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('mount app');
  });

  useEffect(() => {
    loadArticles();
  }, [page]);

  const loadArticles = () => {
    console.log('load');
    blogService.getArticles(page).then((result) => {
      setData(result.articles);
      setTotal(result.articlesCount);
      setLoading(false);
    });
  };
  const updatePage = (newpage) => {
    setPage(newpage);
    loadArticles();
  };

  const content = !loading ? (
    <ArticleList data={data} total={totalArticles} page={page} loggedIn={loggedIn} updatePage={updatePage} />
  ) : (
    <Spinner />
  );
  return (
    <div className={classes.wrapper}>
      <Router>
        <Header />
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
          <Route path="/sign-in" component={SignIn} exact />;
          <Route render={() => <h2 className={classes.not__found}>This page does not exist</h2>} />;
        </Switch>
      </Router>
    </div>
  );
};

export default App;
