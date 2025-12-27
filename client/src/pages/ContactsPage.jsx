import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectContactsCars, selectContactsIsError, selectContactsIsLoading } from '../redux/contacts/selectors.js'
import { apiGetContacts } from '../redux/contacts/operations.js'

const ContactsPage = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(selectContactsCars)
  const loading = useSelector(selectContactsIsLoading)
  const error = useSelector(selectContactsIsError)

  useEffect(() => {
    console.log("Dispatch contacts...");
    dispatch(apiGetContacts());
  }, [dispatch]);  

  return (

    <div>
       {loading && <div>...Loading</div>}
        {error && <div>...error</div>}
    </div>
  )
}

export default ContactsPage