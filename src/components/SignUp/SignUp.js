import React, { useState, useEffect } from 'react';

import classes from './signUp.module.scss';

const SignUp = () => {
  const initialValues = { username: '', email: '', password: '', passwordRepeated: '', checked: true };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'checkbox') {
      const { checked } = e.target;
      setFormValues({ ...formValues, checked: checked });
      return;
    }
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      return;
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (values.username.length < 3 || values.username.length > 20) {
      errors.username = 'Please enter minimum 3 and maximum 20 characters.';
    }
    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (!regex.test(values.email)) {
      errors.email = 'Please enter valid email address.';
    }
    if (values.password.length < 6) {
      errors.password = 'Your password needs to be at least 6 characters.';
    }
    if (values.passwordRepeated !== values.password) {
      errors.passwordRepeated = 'Passwords must match';
    }
    if (values.checked === false) {
      errors.checked = 'Please agree to continue';
    }
    return errors;
  };

  return (
    <div className={classes.signUp}>
      <form className={classes.signUp__form} onSubmit={handleSubmit} noValidate>
        <h2 className={classes.signUp__title}>Create new account</h2>
        <label className={classes.signUp__label}>
          Username
          <input
            className={classes.signUp__input}
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleChange}
          ></input>
          <p className={classes.signUp__warning}>{formErrors.username}</p>
        </label>
        <label className={classes.signUp__label}>
          Email address
          <input
            className={classes.signUp__input}
            type="email"
            name="email"
            placeholder="Email address"
            value={formValues.email}
            onChange={handleChange}
          ></input>
          <p className={classes.signUp__warning}>{formErrors.email}</p>
        </label>

        <label className={classes.signUp__label}>
          Password
          <input
            className={classes.signUp__input}
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          ></input>
          <p className={classes.signUp__warning}>{formErrors.password}</p>
        </label>
        <label className={classes.signUp__label}>
          Repeat password
          <input
            className={classes.signUp__input}
            type="text"
            name="passwordRepeated"
            placeholder="New password"
            value={formValues.passwordRepeated}
            onChange={handleChange}
          ></input>
          <p className={classes.signUp__warning}>{formErrors.passwordRepeated}</p>
        </label>

        <label className={classes.signUp__label_checkbox}>
          <input
            className={classes.signUp__input_checkbox}
            type="checkbox"
            name="checkbox"
            checked={formValues.checked}
            onChange={handleChange}
          ></input>
          I agree to the processing of my personal information
          <p className={classes.signUp__warning}>{formErrors.checked}</p>
        </label>
        <button className={classes.signUp__btn}>Create</button>
        <span className={classes.signUp__link}>
          Already have an account? <a>Sign In.</a>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
