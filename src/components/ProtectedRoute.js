import React from 'react';
import EditAvatarPopup from './EditAvatarPopup';
// import { Navigate } from 'react-router-dom';

function ProtectedRoute({element: Component, ...props}) {
  return (
    // props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
    props.loggedIn ? <Component {...props} /> : <EditAvatarPopup />
  );
}

export default ProtectedRoute;
