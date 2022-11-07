import React from 'react'
import { Navigate , Outlet} from 'react-router-dom'
const ProtectedRoute = ({isAuthenticated,children,adminRoute,isAdmin,redirectAdmin}) => {
    if(!isAuthenticated){
        return <Navigate to={redirectAdmin}/>
    }
    if(adminRoute && !isAdmin){
      return <Navigate to={redirectAdmin} />
    }
  return children ? children : <Outlet/>;
}

export default ProtectedRoute