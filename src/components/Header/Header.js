import { Link } from 'react-router-dom';

import classes from './header.module.scss';

const Header = () => {
  return (
    <nav className={classes.header}>
      <ul className={classes.header__block}>
        <li className={classes.header__item}>
          <Link to="/" className={classes.header__link}>
            Realworld Blog
          </Link>
        </li>
      </ul>
      <ul className={classes.header__block}>
        <li className={classes.header__item}>
          <Link to="/sign-in" className={classes.header__link}>
            Sign In
          </Link>
        </li>
        <li className={classes.header__item}>
          <Link to="/sign-up" className={classes.header__link}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

/*
    <nav className={classes.header}>
      <ul className={classes.header__block}>
        <li className={classes.header__item}>
          <a className={classes.header__link} href="#">
            Realworld Blog
          </a>
        </li>
      </ul>
      <ul className={classes.header__block}>
        <li className={classes.header__item}>
          <a className={classes.header__link} href="#">
            Sign In
          </a>
        </li>
        <li className={classes.header__item}>
          <a className={classes.header__link} href="#">
            Sign Up
          </a>
        </li>
      </ul>
    </nav>
*/
