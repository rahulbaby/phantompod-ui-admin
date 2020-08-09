import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { CirclularLoader } from 'components/loaders';
import { checkUser } from 'modules/auth/actions';
const AuthWrapper = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const auth = useSelector(({ auth }) => auth);
  const { isLoading, authenticated, error, lastFetchValid } = auth;
  useEffect(() => {
    if (!authenticated && !isLoading) history.push('/login?page=' + location.pathname);
  }, [authenticated, isLoading]);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  let cont = props.children || null;

  console.log(isLoading, authenticated, lastFetchValid);
  if ((isLoading && !lastFetchValid) || !authenticated) cont = <CirclularLoader />;
  return <Fragment>{cont}</Fragment>;
};

export default AuthWrapper;
