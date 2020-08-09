import React, { Component, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { FormWrapper, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton } from 'components/common';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';

import { authenticated } from '../actions';

const API = `auth/login`;

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { register, control, handleSubmit, errors, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    setResult(null);

    instance.post(API, data).then((res) => {
      setLoading(false);
      setResult(res);
      if (!res.error) {
        if (res.user && res.user.role === 'admin') {
          reset();
          props.onSuccess && props.onSuccess();
          dispatch(showMessage('Logged In', 'success'));
          dispatch(authenticated(res));
        } else {
          setResult({ ...res, msg: 'Admin login needed', error: true });
        }
      }
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        as={<FormInput label="Phone" fullWidth required margin="normal" autoFocus />}
        name="email"
        control={control}
        defaultValue={''}
      />
      <Controller
        as={<FormInput type="password" label="Password" fullWidth required margin="normal" />}
        name="password"
        control={control}
        defaultValue={''}
      />
      <FormResult result={result} />
      <FormButton
        type="submit"
        variant="contained"
        color="primary"
        label="Sign In"
        fullWidth
        loading={loading}
      />
    </FormWrapper>
  );
};

export default LoginForm;
