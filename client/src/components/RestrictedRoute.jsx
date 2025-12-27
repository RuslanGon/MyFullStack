import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuthIsSignedIn } from '../redux/auth/selectors.js'
import { Navigate } from 'react-router-dom'

const RestrictedRoute = ({children}) => {
const isSignedIn = useSelector(selectAuthIsSignedIn)  

  return isSignedIn ? <Navigate to='/cars' replace /> : children
} 

export default RestrictedRoute