import React from 'react';
import { Formik, Field, Form } from 'formik';
import css from './RegisterPage.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiAddNewContact } from '../redux/contacts/operations.js';


const AddContacts = () => {

const dispatch = useDispatch()  

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Add new contact</h1>
      <Formik
        initialValues={{ name: '', number: '' }}
        onSubmit={async (values) => {
          dispatch(apiAddNewContact(values))
          console.log(values)
        }}
      >
        <Form className={css.form}>
          <label className={css.label}>
            name
            <Field
              className={css.input}
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </label>

          <label className={css.label}>
            Number
            <Field
              className={css.input}
              name="number"  
              type="text"
              placeholder="Enter your number"
            />
          </label>
          <button className={css.button} type="submit">
            Add new contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddContacts;
