import React from 'react'
import { useAuth } from '../ContextApi/AppProvider'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
const Logout = () => {
    const {LogOutUser} = useAuth();
 useEffect(() => {
    LogOutUser()
 },[LogOutUser])
 return <Navigate to ="/login" />
}

export default Logout