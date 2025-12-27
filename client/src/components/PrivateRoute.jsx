import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuthIsSignedIn } from '../redux/auth/selectors.js'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
const isSignedIn = useSelector(selectAuthIsSignedIn)  

  return isSignedIn ? children : <Navigate to='/cars' replace />
}

export default PrivateRoute