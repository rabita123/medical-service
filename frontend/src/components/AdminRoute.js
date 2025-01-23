import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
  console.log('AdminRoute rendering');
  const navigate = useNavigate();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log('AdminRoute - User Info:', userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      console.log('AdminRoute - Redirecting to login');
      navigate('/login', { state: { from: location } });
    }
  }, [userInfo, navigate, location]);

  if (!userInfo) {
    console.log('AdminRoute - No user info, returning null');
    return null;
  }

  if (!userInfo.isAdmin) {
    console.log('AdminRoute - User is not admin, returning null');
    return null;
  }

  console.log('AdminRoute - Rendering children');
  return <>{children}</>;
};

export default AdminRoute; 