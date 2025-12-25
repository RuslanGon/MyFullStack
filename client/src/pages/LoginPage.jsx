import React from 'react';
import { Formik, Field, Form } from 'formik';
import css from './RegisterPage.module.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Login Form</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          console.log(values);
        }}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Email
            <Field
              className={css.input}
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </label>

          <label className={css.label}>
            Password
            <Field
              className={css.input}
              name="password"  
              type="password"
              placeholder="Enter your password"
            />
          </label>

          <button className={css.button} type="submit">
            Login user
          </button>
        </Form>
      </Formik>
      <div className={css.loginRedirect}>
        <p>
          Если вы не зарегистрированы, перейдите на:
          <Link to="/register" className={css.smallLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
