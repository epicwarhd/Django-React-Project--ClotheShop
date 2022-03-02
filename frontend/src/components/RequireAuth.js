import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({children}) => {
    const user = useSelector(state => state.auth)

    return (
        <div>
            {user.account ? <Navigate to='/' replace /> : children}
        </div>
    )
}

export default RequireAuth
