import React from 'react';
import { Formik, Field, Form } from 'formik';
import css from './RegisterPage.module.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Register Form</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          console.log(values);
        }}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field
              className={css.input}
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </label>

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
            Submit
          </button>
        </Form>
      </Formik>
      <div className={css.loginRedirect}>
        <p>
          Если вы уже зарегистрированы, перейдите на:
          <Link to="/login" className={css.smallLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
