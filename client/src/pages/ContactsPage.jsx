import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectContactsIsError,
  selectContactsIsLoading,
} from "../redux/contacts/selectors.js";
import { apiGetContacts } from "../redux/contacts/operations.js";
import AddContacts from "../components/AddContacts.jsx";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const isError = useSelector(selectContactsIsError);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <div>...Loading</div>}
      {isError && <div>...error</div>}
      <AddContacts />
      {Array.isArray(contacts) && contacts.length === 0 && <p>Нет контактов</p>}
      {Array.isArray(contacts) &&
        contacts.map((contact) => (
          <ul key={contact.id}>
            <li>
              <p> Name:{contact.name}</p>
              <p> Nuumber:{contact.number}</p>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default ContactsPage;
