import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectContacts, selectContactsIsError, selectContactsIsLoading } from '../redux/contacts/selectors.js'
import { apiGetContacts } from '../redux/contacts/operations.js'

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
    </div>
  )
}

export default ContactsPage