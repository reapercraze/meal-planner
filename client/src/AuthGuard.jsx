import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = checkAuthentication(); // Replace with your authentication check

    setIsLoggedIn(isAuthenticated);
  }, []);

  return isLoggedIn ? <>{children}</> : <Redirect to="/login" />;
};

export default AuthGuard;
