import { Link } from 'react-router-dom';

import placeholder from '../../assets/no_avatar.svg';

import classes from './header.module.scss';

const Header = ({ loggedIn, userData, logOut }) => {
  const profilePic = userData?.image ? (
    <img src={userData.image} alt="аватар профиля"></img>
  ) : (
    <img src={placeholder} alt="аватар профиля"></img>
  );
  if (loggedIn && userData) {
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
          <li className={classes.header__item_loggedin}>
            <Link to="/sign-in" className={classes.header__link}>
              Create article
            </Link>
          </li>
          <li className={classes.header__item_loggedin}>
            <Link to="/sign-in" className={classes.header__link}>
              {userData.username}
              {profilePic}
            </Link>
          </li>
          <li className={classes.header__item_loggedin}>
            <button className={classes.header__link} onClick={logOut}>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    );
  } else {
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
  }
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
