import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./ContactsPage.module.css";
import {selectContacts, selectContactsIsError, selectContactsIsLoading,} 
from "../redux/contacts/selectors.js";
import { apiDeleteContact, apiGetContacts } from "../redux/contacts/operations.js";
import AddContacts from "../components/AddContacts.jsx";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const isError = useSelector(selectContactsIsError);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(apiDeleteContact(id))
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Contacts</h2>

      {isLoading && <div className={css.status}>...Loading</div>}
      {isError && <div className={css.status}>...Error</div>}

      <AddContacts />

      {Array.isArray(contacts) && contacts.length === 0 && (
        <p className={css.status}>Нет контактов</p>
      )}

      <ul className={css.list}>
        {Array.isArray(contacts) &&
          contacts.map((contact) => (
            <li key={contact.id} className={css.item}>
              <p className={css.name}>Name: {contact.name} 
              <button onClick={() => handleDelete(contact.id)} type="bttton">delete</button>
              </p>
              <p className={css.number}>Number: {contact.number}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
